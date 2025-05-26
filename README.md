# MY-API-HONO - Testando o Deno e o Hono ![Finalizado](https://img.shields.io/badge/status-finalizado-green)

## Tecnologias
![Tecnologias](https://skillicons.dev/icons?i=typescript,deno,postgres,zod)

## Índice

- [MY-API-HONO](#artlaser---catálogo-online-)
  - [Tecnologias](#tecnologias)
  - [Índice](#índice)
  - [Sobre](#sobre)
  - [Funcionalidades](#funcionalidades)
  - [Instalação](#instalação)
  - [Uso](#uso)
  - [Resultados](#resultados)
  - [Contato](#contato)

## Sobre
Neste repositório, está o **back-end** da aplicação, construído com **Deno**, utilizando o framework **Hono**, com **PostgreSQL** como banco de dados e **Drizzle ORM** para manipulação das entidades. As validações são feitas com a poderosa biblioteca **Zod**.

## Funcionalidades

- **API Restful com Hono**
  - Endpoints para gerenciamento completo de usuários e organizações.

- **Validações com Zod**
  - Garante integridade e segurança dos dados de entrada e saída.

- **Relacionamentos Avançados**
  - Usuários podem pertencer a múltiplas organizações.
  - Cada usuário possui apenas uma organização ativa por vez.
  - Requisições refletem a organização ativa do usuário.

- **Modelagem do Banco de Dados**
  - Tabelas:
    - `Users`
    - `Organizations`
    - Tabelas intermediárias para gerenciar relacionamentos, se necessário.

- **Listagem com Filtros e Paginação**
  - Listagens otimizadas para melhorar a navegação e gestão de dados.

- **Remoção em Lote**
  - Permite a exclusão múltipla de usuários.

- **Expansível para Autenticação**
  - Estrutura preparada para inclusão de sistema de autenticação.
  - Possibilidade de proteger endpoints privados com middleware.

## Instalação

1. Clone o repositório:
   ```sh
   git clone https://github.com/PedrOliveiraM/artlaser.git
``

2. Instale as dependências:

   ```sh
   deno task install
   ```

3. Configure o ambiente:

   * Crie um arquivo `.env` baseado em `.env.example`.

4. Inicie o banco de dados (ex: via Docker):

   ```sh
   docker-compose up -d
   ```

5. Execute as migrações com o Drizzle ORM:

   ```sh
   deno task migrate
   ```

## Uso

Para iniciar o servidor localmente:

```sh
deno task dev
```

A API estará disponível para ser consumida pelo front-end ou ferramentas de testes (ex: Postman). É possível realizar operações como criação, listagem, atualização e exclusão de usuários e organizações.

## Resultados

* **API escalável e moderna com Deno + Hono.**
* **Modelo de dados preparado para múltiplas organizações por usuário.**
* **Base sólida para futura integração com autenticação JWT e pagamentos.**

## Contato

[![LinkedIn](https://img.shields.io/badge/LinkedIn-%230077B5.svg?\&style=for-the-badge\&logo=linkedin\&logoColor=white)](https://www.linkedin.com/in/pedro-oliveira-m/)
[![Email](https://img.shields.io/badge/Email-D14836?style=for-the-badge\&logo=gmail\&logoColor=white)](mailto:pedro.oliveira@monteirodev.com)
