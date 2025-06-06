# Comparação Semântica com Elasticsearch

Este repositório reúne um sistema criado para comparação semântica de notícias, composto por um backend (FastAPI + Elasticsearch) e um frontend (React).

## Estrutura do Projeto

```
semantic_comparison/
├── backend/     # FastAPI + Elasticsearch (busca semântica + rerank)
├── frontend/    # Aplicação React (interface web)
```

## Visão Geral

### Backend
Expõe endpoints REST para consulta e comparação semântica de notícias usando Elasticsearch, embeddings e rerank.

1. **Interface do FastAPI**: Possibilita a interação com o backend via interface web.

![FastAPI](images/back1.png)

2. **Consulta de documentos**: Endpoint que retorna uma lista paginada de documentos.

![Endpoint de consulta de documentos](images/back2.png)

3. **Comparação semântica**: Endpoint que compara documentos semânticamente com base em embeddings e rerank.

![Endpoint de comparação semântica](images/back3.png)

### Frontend
Interface web em React com navegação entre páginas (React Router), listagem paginada e estilizada de documentos e integração com o backend.

1. **Interface do React**: Interface web em React com listagem de documentos e comparação semântica.

![Interface do React](images/front1.png)

2. **Consulta de documentos**: Página que lista documentos de forma paginada.

![Consulta de documentos](images/front2.png)

3. **Comparação semântica**: Página que compara documentos semânticamente com base em embeddings e rerank.

![Comparação semântica](images/front3.png)

## Como Rodar Localmente

1. **Clone o repositório**
2. Siga as instruções específicas em:
   - [`backend/README.md`](./backend/README.md)
   - [`frontend/README.md`](./frontend/README.md)

## Requisitos Gerais
- Python 3.8+
- Node.js 18+
- Elasticsearch 8.15+

## Créditos
- Base de dados: [Kaggle - Folha News](https://www.kaggle.com/datasets/luisfcaldeira/folha-news-of-the-brazilian-newspaper-2024)

---

Consulte os READMEs de backend e frontend para detalhes de configuração, execução e arquitetura.

---

**Para atualizar seu repositório no GitHub:**
1. Faça commit de todas as alterações locais (`git add . && git commit -m "Atualizações frontend/backend e docs"`).
2. Faça push para o seu repositório remoto (`git push`).
