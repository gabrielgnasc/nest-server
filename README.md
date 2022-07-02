<h2 align="center"> Starter Web Service - NestJS </h2>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

 <p align="center">A simple Web Service in <a href="https://github.com/nestjs/nest" target="_blank">NestJS</a> to starter development of API</p>
    <p align="center">
    <a href="https://www.npmjs.com/package/nestjs-i18n" target="_blank"><img alt="npm version" src="https://img.shields.io/npm/v/nestjs-i18n" /></a>
    <a href="https://www.npmjs.com/package/nestjs-i18n" target="_blank"><img alt="NPM" src="https://img.shields.io/npm/l/nestjs-i18n" /></a>
    <a href="https://github.com/gabrielgnasc/nest-server/actions/workflows/test.yml" target="_blank"><img src="https://github.com/gabrielgnasc/nest-server/actions/workflows/test.yml/badge.svg?branch=main" /></a>
     <a href="https://coveralls.io/github/gabrielgnasc/nest-server?branch=main" target="_blank"><img alt="coverage" src="https://coveralls.io/repos/github/gabrielgnasc/nest-server/badge.svg?branch=main" /></a>
</p>

## Description

An initial application to build an api with JWT authentication, where it is possible to maintain user registration, to send password recovery emails, register API documentation, unit tests and e2e, using SOLID and TDD principles

## API Operation

- **Functional Requirements**: [Requirements](REQUIREMENTS.md)
- **Api Documentation**: access the route http://localhost:3000/docs

## Tecnologies used

- [NestJS](https://github.com/nestjs/nest)
- [TypeORM](https://github.com/typeorm/typeorm)
- [Docker](https://www.docker.com/)
- [Swagger](https://swagger.io/)
- [Jest](https://github.com/facebook/jest)
- [Nodemailer](https://github.com/nodemailer/nodemailer/)

## Installation

```bash
$ yarn install
```

## Running the app

```bash
# development
$ yarn start

# watch mode
$ yarn start:dev
# or
$ docker-compose up -d

# production mode
$ yarn start:prod
# or
$ docker build .
$ docker run -p 3000:3000 [image-id]
```

## Test

```bash
# unit tests
$ yarn test

# e2e tests
$ yarn test:e2e

# test coverage
$ yarn test:cov
```

## License

[MIT licensed](LICENSE).
