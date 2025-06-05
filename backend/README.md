# Backend - Semantic Comparison API

## Descrição

Esta aplicação realiza comparação semântica de notícias utilizando FastAPI e Elasticsearch. O objetivo é permitir a consulta de um artigo e o ranqueamento de outros artigos similares com base em embeddings e rerank via modelo Cohere.

---

## Base de Dados Utilizada

A aplicação utiliza como fonte principal a base de dados **Folha News** disponível no Kaggle:
[https://www.kaggle.com/datasets/luisfcaldeira/folha-news-of-the-brazilian-newspaper-2024](https://www.kaggle.com/datasets/luisfcaldeira/folha-news-of-the-brazilian-newspaper-2024)

**Resumo da base:**
- Contém milhares de notícias da Folha de São Paulo, um dos principais jornais do Brasil.
- Cada registro inclui campos como: `Title`, `Content`, `categories`, `Url`, entre outros.
- A base é adequada para tarefas de NLP, análise de notícias, classificação, busca semântica e comparação de similaridade textual.
- Os campos `Content_vec` e `Title_vec` utilizados nesta aplicação são vetores semânticos derivados dos textos originais por modelos de embedding (ex: e5-multilingual ou distiluse-base-multilingual-cased-v2).

---

## Pré-requisitos

- **Python 3.8+**
- **Elasticsearch 8+** com:
  - Suporte a campos vetoriais do tipo `semantic_text` (ex: via modelo e5-multilingual)
  - Endpoint de inferência configurado para rerank (ex: Cohere rerank-multilingual-v3.0)
- Vetorização dos campos de texto (`Content_vec` e `Title_vec`) já realizada previamente no Elasticsearch.
- Indexação baseada na base original: [Folha News Kaggle](https://www.kaggle.com/datasets/luisfcaldeira/folha-news-of-the-brazilian-newspaper-2024)

---

## Ambiente Virtual e Instalação de Dependências

Recomenda-se criar um ambiente virtual Python para isolar as dependências do projeto. Execute os comandos abaixo dentro da pasta `backend`:

### Windows
```powershell
python -m venv semantic_comparison-venv
.\semantic_comparison-venv\Scripts\activate
pip install -r requirements.txt
```

### Linux/macOS
```bash
python3 -m venv semantic_comparison-venv
source semantic_comparison-venv/bin/activate
pip install -r requirements.txt
```

O diretório do ambiente virtual está listado no `.gitignore` e **não deve ser versionado**.

---

## Configuração do .env

Exemplo de `.env`:
```env
# Configurações do Elasticsearch
ELASTIC_URL=https://<seu-endpoint-elastic>:9200
ELASTIC_INDEX=<nome-do-indice>
ELASTIC_USER=<usuario>
ELASTIC_PASSWORD=<senha>
ELASTIC_VERIFY_CERTS=False

# Nome do modelo de rerank (deve existir no cluster Elastic)
INFERENCE_ID=cohere-multilingual-rerank

# Campos utilizados (ajuste conforme seu mapeamento)
FIELD_CATEGORY=categories
FIELD_CONTENT_VEC=Content_vec
FIELD_TITLE_VEC=Title_vec
FIELD_TITLE=Title
```

---

## Teoria e Estratégia de Busca

### 1. **Embeddings e Vetorização**
- Os campos `Content_vec` e `Title_vec` devem ser campos do tipo `semantic_text` gerados por um modelo de text_embedding, como o **e5-multilingual**.
- Isso é pré-requisito para buscas semânticas eficientes.

### 2. **RRF (Reciprocal Rank Fusion)**
- A query utiliza o operador `rrf` para combinar múltiplos rankings (ex: similaridade semântica do conteúdo e do título).
- O RRF aumenta a robustez da busca ao considerar múltiplos aspectos do texto.

**O que é RRF?**
RRF (Reciprocal Rank Fusion) é uma técnica que combina os resultados de múltiplas consultas, atribuindo pontuações baseadas na posição de cada documento em cada lista de resultados, não diretamente nas pontuações brutas (_score) dessas consultas.

**Como funciona?**
O RRF calcula a pontuação final de cada documento somando recíprocos das suas posições nas listas parciais:

```
score = 0.0
for q in queries:
    if d in result(q):
        score += 1.0 / ( k + rank( result(q), d ) )
return score
```
Onde:
- `k` é uma constante de suavização (tipicamente 60)
- `q` é uma consulta (por exemplo, busca BM25 ou vetorial)
- `d` é um documento retornado
- `rank(result(q), d)` é a posição do documento na lista de resultados daquela consulta

### 3. **Rerank com Cohere**
- Após o RRF, os resultados são reranqueados usando o modelo Cohere (via endpoint de inferência configurado no Elastic).
- O modelo utilizado é o `cohere-multilingual-rerank` (baseado em `rerank-multilingual-v3.0`).
- É possível criar uma conta gratuita no Cohere e importar o modelo para o cluster Elastic via API key.
- O campo `inference_id` no .env deve ser ajustado conforme o nome do modelo importado no cluster (nome do inference endpoint).

#### Como criar o endpoint de inferência do modelo de rerank no Elasticsearch
Execute a seguinte requisição no Dev Tools do Kibana ou via API:

```json
PUT _inference/rerank/cohere-multilingual-rerank
{
  "service": "cohere",
  "service_settings": {
    "api_key": "{API_KEY}",
    "model_id": "rerank-multilingual-v3.0"
  }
}
```

Substitua `{API_KEY}` pela sua chave de API Cohere.

Após a criação, utilize o nome do endpoint (`cohere-multilingual-rerank`) na variável `INFERENCE_ID` do seu `.env`.

### 4. **Normalização de Score**
- O score final dos similares é normalizado pelo score do próprio documento pesquisado, garantindo que o documento consultado sempre tenha score 1.0 e os similares tenham score relativo a ele.

---

## Exemplo de Query Utilizada
```json
{
  "min_score": 0.01,
  "retriever": {
    "text_similarity_reranker": {
      "retriever": {
        "rrf": {
          "retrievers": [
            { "standard": { "query": { "bool": { "filter": [{"term": {"categories": "<categoria>"}}], "must": [{"semantic": {"field": "Content_vec", "query": "<conteudo>"}}] } } } },
            { "standard": { "query": { "bool": { "filter": [{"term": {"categories": "<categoria>"}}], "must": [{"semantic": {"field": "Title_vec", "query": "<titulo>"}}] } } } }
          ]
        }
      },
      "field": "Title",
      "inference_id": "cohere-multilingual-rerank",
      "inference_text": "<titulo>"
    }
  }
}
```

---

## Observações Importantes
- O usuário deve garantir que os campos e modelos estejam devidamente configurados no Elasticsearch.
- O nome do modelo de rerank (`INFERENCE_ID`) e os nomes dos campos podem ser alterados conforme a estrutura do índice.
- O backend não realiza a vetorização dos textos: isso deve ser feito previamente.
- O score exibido para o documento selecionado é sempre 1.0; os similares têm score relativo a ele.

---

## Referências
- [Kaggle - Folha News](https://www.kaggle.com/datasets/luisfcaldeira/folha-news-of-the-brazilian-newspaper-2024)
- [Elasticsearch RRF](https://www.elastic.co/guide/en/elasticsearch/reference/current/reciprocal-rank-fusion.html)
- [Elasticsearch Rerank](https://www.elastic.co/guide/en/elasticsearch/reference/current/inference-processor.html)
- [Cohere Rerank API](https://docs.cohere.com/docs/rerank-reference)

---

Este backend, desenvolvido em FastAPI, provê endpoints para listagem, consulta e comparação semântica de documentos em um índice Elasticsearch.

## Como usar

1. **Ative o ambiente virtual:**
   ```powershell
   .\venv\Scripts\Activate
   ```
2. **Instale as dependências:**
   ```powershell
   pip install -r requirements.txt
   ```
3. **Configure o arquivo `.env`:**
   - Já incluído. Ajuste se necessário:
     ```env
     ELASTIC_URL=http://localhost:9200
     ELASTIC_INDEX=news_index
     ```
4. **Execute o servidor:**
   ```powershell
   uvicorn app.main:app --reload
   ```

## Endpoints principais
- `/documents`: Listagem paginada de documentos
- `/documents/{doc_id}`: Busca documento por ID
- `/compare/{doc_id}`: Busca híbrida (semântica + categoria) a partir de documento selecionado

---

Qualquer ajuste de variáveis de ambiente pode ser feito no arquivo `.env`.
