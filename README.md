# MyWallet BackEnd

### Deploy

<a href="https://mywalletapi-new.onrender.com/health">Clique Aqui!</a>

##

### Funcionalidades e Rotas:

- ###### POST /cadastro

  - Cria um participante.
  - Entrada:

  ```js
  {
  	name: "Neme",
  	email: "caioneme@gmail.com",
  	password: "123"
  }
  ```

  - Saida

  ```js
  Created;
  ```

- ###### POST /login

  - Entra na conta e retorna um token para acesso.
  - Entrada:

  ```js
  {
  	email: "caioneme@gmail.com",
  	password: "123"
  }
  ```

  - Saída:

  ```js
    68c46e9a-934d-400d-b892-e1fc10884249 //token aleatório
  ```

- ###### POST /nova-transacao/:type

  - Adiciona uma nova entrada ou saida no banco de dados.
  - Type pode ter 2 valores validos: entrada || saida.
  - Exige um token.
  - Entrada:

  ```js
  {
  	value:1000, //Em centavos
  	description:"entrada 13ª"
  }
  ```

  - Saída:

  ```js
  Created;
  ```

- ###### GET /home

  - Retorna todas as transições de determinada conta.
  - Exige um token.
  - Saída:

  ```js
  {
  	id: 1,
  	name: "Neme",
  	email: "caioneme@gmail.com",
  	Transactions: [
  		{
  			id: 1,
  			date: "09/12",
  			type: "deposit",
  			value: 1000,
  			description: "entrada 13ª"
  		}, {...}
  	]
  }
  ```

##

### Proposta do Projeto:

Apresentar um software capaz de gerenciar gastos

##

### Tecnologias:

- TypeScript;
- Node(20.9.0) + Express;
- Prisma (ORM);
- Postgres;
- Jest e Supertest.

##

### Como rodar o projeto desenvolvimento:

1. Clone esse repositório.
2. Instale as dependências `npm i`.
3. Crie um banco de dados PostgreSQL com o nome que desejar.
4. Configure o `.env`,`.env.development` e `.env.test` usando o arquivo `.env.example`.
5. Execute todas as migrações `npm run dev:migration:run`.
6. Seed do Banco `npm run dev:seed`.
7. Rode o back-end usando o comando `npm run dev`.

##

### Como Rodar os testes:

1. Clone esse repositório.
2. Instale as dependências `npm i`.
3. Crie um banco de dados PostgreSQL com o nome que desejar.
4. Configure o `.env`,`.env.development` e `.env.test` usando o arquivo `.env.example`.
5. Aplique as migrações `npm run test:migration:run`.
6. Rode os tests `npm run test`

##

### Como rodar em produção:

```bash
  npm run build
  npm start
```

##

### Colaboradores

- <a href="https://github.com/CaioNeme"> Caio Neme </a>
