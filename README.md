# Semantic Comparison Project

Este repositório reúne um sistema completo para comparação semântica de notícias, composto por um backend (FastAPI + Elasticsearch) e um frontend (React).

## Estrutura do Projeto

```
semantic_comparison/
├── backend/     # API FastAPI + lógica de busca semântica
├── frontend/    # Aplicação React (interface web)
├── README.md    # Este arquivo (overview geral)
```

## Visão Geral
- **Backend**: expõe endpoints REST para consulta e comparação semântica de notícias usando Elasticsearch, embeddings e rerank.
- **Frontend**: interface web em React com navegação entre páginas (React Router), listagem paginada e estilizada de documentos, feedback visual ao copiar IDs, e integração robusta com o backend.

## Como Rodar Localmente

1. **Clone o repositório**
2. Siga as instruções específicas em:
   - [`backend/README.md`](./backend/README.md)
   - [`frontend/README.md`](./frontend/README.md)

## Requisitos Gerais
- Python 3.8+
- Node.js 18+
- Elasticsearch 8+

## Funcionalidades Recentes
- Listagem de documentos paginada com visual moderno.
- Feedback visual ao copiar o _id do documento.
- Navegação entre páginas (React Router).
- Botão para retornar à tela inicial.
- Integração frontend-backend robusta e amigável para deploy.

## Deploy
- Para deploy em produção, recomenda-se uso de proxy reverso (nginx), HTTPS e variáveis de ambiente seguras.

## Créditos
- Base de dados: [Kaggle - Folha News](https://www.kaggle.com/datasets/luisfcaldeira/folha-news-of-the-brazilian-newspaper-2024)

---

Consulte os READMEs de backend e frontend para detalhes de configuração, execução e arquitetura.

---

**Para atualizar seu repositório no GitHub:**
1. Faça commit de todas as alterações locais (`git add . && git commit -m "Atualizações frontend/backend e docs"`).
2. Faça push para o seu repositório remoto (`git push`).
