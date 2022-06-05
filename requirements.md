## Server Nest

## Requisitos Funcionais

- [] Autenticação:

```bash
  - [] O usuário deve poder fazer autenticação com login e senha
  - [] A autenticação deve retornar um token JWT
  - [] O usuário deve conseguir recuperar seus dados somente com o token, caso ainda seja válido;
```

- [] Usuário:

```bash
  - [] O usuário deve conseguir criar uma conta;
  - [] O usuário deve conseguir alterar seu nome e email;
  - [] O usuário deve conseguir alterar sua senha;
  - [] O usuário deve conseguir recuperar sua senha pelo e-mail;
```

## Regras de negócio

- [] Autenticação:

```bash
  - [] O token do usuário deve ter duração máxima de 2 horas;
```

- [] Usuário:

```bash
  - [] Somente o usuário autenticado poderá fazer alterações, sendo estas somente em seu perfil;
  - [] A recuperação de senha ocorrerá por uma URL enviada via email onde, a mesma possui um token com duração de 15 minutos, ao qual o usuário poderá alterar sua senha;
```

## Requisitos não funcionais

- Nest.js
- TypeORM
- GraphQL
- JWT
- TDD
