# README

Projeto com Middleware Proxy de APIs com controle de requisições, armazenamento e com a possibilidade de consultas

## Instalação

### Local

Com o yarn já instalado.

```bash
yarn install
```

### Database

```bash
yarn start
```

## Uso

Para utiliza-lo, executar comando:

```bash
yarn dev
```

### Rotas

Rota do proxy para api.mercadolibre.com

```bash
GET / POST / PUT / DELETE
http://localhost:3333/api/proxy{ PATH DE DESTINO }
```

Rota para consultar requisições

```bash
GET
http://localhost:3333/list&offset={ offset }
```

## Considerações

Utilizei Node.js para essa API pois é uma linguagem de fácil escalonamento e a existente melhoria utilizando cluster;

API utiliza mongoose como DB e SQLite em teste;

Construção de bancos com sequelize;

### Melhorias
