# Meu Site Pessoal

Site pessoal para gerenciamento de receitas, finanças e trade.

## Funcionalidades

### Receitas
- Adicionar novas receitas (título, ingredientes, instruções)
- Visualizar todas as receitas cadastradas
- Remover receitas

### Finanças
- Adicionar lançamentos financeiros (data, valor, tipo de investimento, ativo)
- Visualizar todos os lançamentos em formato de tabela
- Remover lançamentos
- Tipos de investimento disponíveis: Ações, FIIs, Renda Fixa, Stocks, Criptomoedas, Outros

### Trade
- Em desenvolvimento

## Tecnologias

- React 18
- Vite
- React Router
- localStorage (armazenamento local no navegador)
- CSS Modules

## Como Executar Localmente

1. Instale as dependências:
```bash
npm install
```

2. Execute o servidor de desenvolvimento:
```bash
npm run dev
```

3. Abra o navegador em `http://localhost:5173`

## Build para Produção

```bash
npm run build
```

O build será gerado na pasta `dist/`.

## Deploy no GitHub Pages

1. Certifique-se de que o repositório está no GitHub
2. Atualize o campo `base` no arquivo `vite.config.js` com o nome do seu repositório
3. Execute o deploy:
```bash
npm run deploy
```

Isso irá fazer o build e publicar na branch `gh-pages` do seu repositório.

4. No GitHub, vá em Settings > Pages e configure para usar a branch `gh-pages`

**Nota:** Os dados são armazenados no localStorage do navegador, então os dados ficam apenas no seu navegador e não são sincronizados entre dispositivos.
