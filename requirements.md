## Server Nest

## Requisitos Funcionais

- [x] Autenticação:

  - [x] O usuário deve poder fazer autenticação com login e senha
  - [x] A autenticação deve retornar um token JWT
  - [x] O usuário deve conseguir recuperar seus dados somente com o token, caso ainda seja válido;

- [x] Usuário:

  - [x] O usuário deve conseguir criar uma conta;
  - [x] O usuário deve conseguir alterar seu nome e email;
  - [x] O usuário deve conseguir alterar sua senha;
  - [x] O usuário deve conseguir recuperar sua senha pelo e-mail;

## Regras de negócio

- [x] Autenticação:

  - [x] O token do usuário deve ter duração máxima de 30 min

- [x] Usuário:

  - [x] Somente o usuário autenticado poderá fazer alterações, sendo estas somente em seu perfil;
  - [x] A recuperação de senha ocorrerá por uma URL enviada via email onde, a mesma possui um token com duração de 30 minutos, ao qual o usuário poderá alterar sua senha;

## Requisitos não funcionais

- Nest.js
- TypeORM
- SOLID
- JWT
- TDD
- Docker
