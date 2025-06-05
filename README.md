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
- **Frontend**: interface web para consulta, visualização e interação com os resultados.

## Como Rodar Localmente

1. **Clone o repositório**
2. Siga as instruções específicas em:
   - [`backend/README.md`](./backend/README.md)
   - [`frontend/README.md`](./frontend/README.md)

## Requisitos Gerais
- Python 3.8+
- Node.js 18+
- Elasticsearch 8+

## Deploy
- Para deploy em produção, recomenda-se uso de proxy reverso (nginx), HTTPS e variáveis de ambiente seguras.

## Créditos
- Base de dados: [Kaggle - Folha News](https://www.kaggle.com/datasets/luisfcaldeira/folha-news-of-the-brazilian-newspaper-2024)

---

Consulte os READMEs de backend e frontend para detalhes de configuração, execução e arquitetura.
