<p align="center">
<img width="700px" src="images/project.png">
</p>
<h2 align="center"><b>Comparação Semântica com Elasticsearch</b></h2>

<p align="center">
   <a>
      <img src="https://img.shields.io/badge/Elastic%20Stack-8.15+-blue?style=flat&logo=elasticsearch">
   </a>
   <a>
      <img src="https://img.shields.io/badge/Cohere-green?logo=data%3Aimage%2Fpng%3Bbase64%2CiVBORw0KGgoAAAANSUhEUgAAAC0AAAAtCAQAAACQEyoRAAAAIGNIUk0AAHomAACAhAAA%2BgAAAIDoAAB1MAAA6mAAADqYAAAXcJy6UTwAAAACYktHRAD%2Fh4%2FMvwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB%2BkGBhENKMpLVWYAAANcSURBVEjHtZdfaJVlHMc%2F79nc2dymwaaTbUopLXchFhXalEUrCIzqIgk0CskLyYiIXXQTXYUXXXUX7FY0ojJpNysrKEgMGyhOFkWabjjcdG6uDtuZ26eL95yds%2FPPc7a33905PM%2Fn%2BT6%2F5%2Ffvhf%2FNgvy%2FBGigmUaqy6TcY5IJkstxQR50Lbt5gV1spp5YmfIWmOISp%2BhnqohaY3Z72hlXZkkHfNxQYA64zl5vrhCbtmH35MDFWo85u0qw6q9ucRk4sDcSsOpHS7pF7F61KzL2u%2B1CKgbW8h4bIwvoB3kUICbAUzwbGRjibGNJ9T4aI0RDfRrdwK5IwfBPGt1Ee6TgOf5Ko9fRECn6ChfT6FihtF%2BxyUlG0%2BgEcxGiv6MvLFExYJKJyBSf4R3Gwx8x4A5DkYDv8Alv8OdSWRXxkPdWmdzTfu7TVucUVLHNi6vATvqZz1lbuFLjWyZXAF10xE%2FtsqYAdgne6MkKsUkv%2BIGdVhWBZune4rcVuOAbX7OlqNYC8BPO3Qc677Afuzv0rFhnq1ttsz7%2FmCADBxp4nbfZTlXB86c4yxec4QYCNezkRfaymVrmGOMcpzlPMiihvd0j9nvNhAupp0o67lmP2WVdSmuT%2B%2F3SWy7muKnPrRn1QT4eiNPKQ7SxnioS3OQq17gLQBUdvMwr7CBeUN1vHOV8Hjbluw02G8%2F3nBj4hH2O5mjNtUEfWbZbxE4%2F9HuHvOSA72dfDcQ1HnG0rPg5bq1ZG6s97JUsPYsO%2B6ph5wwPPlr2VDXj8ylZqWzM33jbA6lnwy5vVJBOfQamwE8Wueofbje80%2FEKwHrBJokBAYdoK%2FjeD3MQgG08c%2F%2B0y7IWmsN6vYHuoot6aAQ6KxyA4tSl0S1FF7XyALCJNRWhk8yG6JoS038NNcBCRWAY53aIni%2BxdZ55YLTCxjyYRk%2BUaLtjTAGXGakAnOBrFtPoX4ou%2B5m7wHX6K0AP8AMEqbjeW2S6vuqOVMp0OFRmTA%2B7M3t0D%2Bw1kbdo2sPhIhH3OVIWuCe3OMV9NyeV%2F%2FbNTPMXscdzJYeKhF9lKc5MI8R4jIPsoQUZ4ydOcDm77gqwif28RAcNOV%2BUScYZ5BQ%2F8m9mT5CtnYBG1iPTzBT6tBSgjo2sy2lxs9xikkUinUtL2H%2B3rrcdccYnQgAAACV0RVh0ZGF0ZTpjcmVhdGUAMjAyNS0wNi0wNlQxNzoxMzo0MCswMDowMMfXftIAAAAldEVYdGRhdGU6bW9kaWZ5ADIwMjUtMDYtMDZUMTc6MTM6NDArMDA6MDC2isZuAAAAKHRFWHRkYXRlOnRpbWVzdGFtcAAyMDI1LTA2LTA2VDE3OjEzOjQwKzAwOjAw4Z%2FnsQAAABN0RVh0bWltZTp0eXBlAGltYWdlL3BuZ7mVEIcAAAAASUVORK5CYII%3D&labelColor=grey">
   </a>
   <a>
      <img src="https://img.shields.io/badge/Python-yellow?logo=Python&logoColor=white&labelColor=grey">
   </a>
   <a>
      <img src="https://img.shields.io/badge/FastAPI-lightgreen?style=flat&logo=FastAPI&logoColor=white&labelColor=grey">
   </a>
   <a>
      <img src="https://img.shields.io/badge/React-18%2B-lightblue?style=flat&logo=React&logoColor=white&labelColor=grey">
   </a>
</p>

Este projeto é uma aplicação voltada para comparação semântica de notícias. 

Ele utiliza o modelo [`elastic/multilingual-e5-small`](https://huggingface.co/elastic/multilingual-e5-small) para geração de embeddings e o modelo [`Cohere/rerank-multilingual-v3.0`](https://huggingface.co/Cohere/rerank-multilingual-v3.0) para reranqueamento.

No backend, baseado em **FastAPI** e **Elasticsearch**, as buscas são realizadas por meio da [API](https://www.elastic.co/docs/solutions/search/retrievers-overview) `retriever`, combinando a **RRF (Reciprocal Rank Fusion)** com o `text_similarity_reranker`, permitindo a recuperação semântica dos documentos mais relevantes.

A aplicação compara uma notícia consultada com o restante da base e retorna os conteúdos mais similares. O frontend em **React** oferece uma interface simples e responsiva para navegação.

O objetivo do projeto é servir como modelo para casos de uso que envolvam comparação semântica em grandes volumes de dados, como:

- Recomendação de conteúdo
- Detecção de duplicidade ou plágio
- Agrupamento e navegação inteligente em bases de texto

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
