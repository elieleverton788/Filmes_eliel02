# Catálogo de Filmes — Pure.css

Projeto acadêmico da Parte 1 + Parte 4.

## Tecnologias

- Node.js
- Express
- Express Handlebars
- Sequelize
- SQLite
- Pure.css

## Entidades

- Filme
- Artista
- Diretor
- Ficha Técnica

## Associações

- Diretor 1:N Filme
- Filme N:N Artista
- Filme 1:1 Ficha Técnica

## Instalação

No terminal, dentro da pasta do projeto:

```bash
npm install
npm start
```

Acesse:

http://localhost:3000

## Telas

Cada entidade possui:

- Cadastrar
- Detalhar
- Listar Todos

Além disso, há:

- Editar
- Excluir

## Pure.css utilizado

O projeto utiliza:

- `pure-menu`
- `pure-form`
- `pure-table`
- `pure-g`
- `pure-u-*`
- `pure-button` apenas para ações de navegação/formulário.

Para a apresentação, os componentes principais podem ser demonstrados separadamente, sem considerar `button` como um dos cinco componentes exigidos.
