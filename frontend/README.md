# Frontend

Este diretório contém o frontend React da aplicação de comparação semântica de notícias.

## Tecnologias
- React 18+
- CSS Modules
- Integração com FastAPI backend via REST

## Como rodar localmente

1. **Instale as dependências:**
   ```bash
   npm install
   ```
2. **Configure o proxy (opcional):**
   - O arquivo `package.json` já inclui um campo `proxy` apontando para o backend (`http://localhost:8000`).
   - Se o backend estiver em outro endereço, ajuste esse campo ou as URLs das requisições.
3. **Rode o frontend:**
   ```bash
   npm start
   ```
   Acesse em [http://localhost:3000](http://localhost:3000)

## Build para produção
```bash
npm run build
```
Os arquivos finais ficarão em `build/`.

## Estrutura dos Principais Arquivos
- `src/App.jsx` — componente principal
- `src/ConfigPanel.jsx` — painel de consulta
- `src/ComparisonView.jsx` — exibição dos resultados
- `public/index.html` — template HTML

## Observações
- O frontend depende do backend estar rodando e acessível.

## Funcionalidades Recentes
- Navegação entre páginas com React Router.
- Listagem de documentos paginada e visualmente moderna.
- Feedback visual ao copiar o _id do documento.
- Botão para retornar à tela inicial.
- Integração robusta com backend FastAPI/Elasticsearch.
- Título das notícias retornadas pelo Elasticsearch é clicável, permitindo visualizar o conteúdo completo no site da Folha de São Paulo.

---
Consulte o [README do backend](../backend/README.md) para detalhes da API e configuração do Elasticsearch.
