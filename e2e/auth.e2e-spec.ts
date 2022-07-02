import { HttpStatus } from '@nestjs/common';
import * as request from 'supertest';
import { app } from './settings/setup';
import { ErrorMessageHelper } from '../src/common/helpers';
import { UserDTO } from '../src/common/dtos/user';

describe('AuthController (e2e)', () => {
  let req: request.SuperTest<request.Test>;
  let token: string;
  let createdUser: UserDTO;

  const createUser = async () => {
    const user = {
      login: 'any_login',
      password: 'any_password',
      name: 'any_name',
      email: 'any_login@mail.com',
    };
    const response = await req.post('/user').send(user).expect(201);
    createdUser = response.body;
  };

  const authGet = (url: string) => {
    return req.get(url).set('Authorization', `Bearer ${token}`);
  };

  beforeAll(async () => {
    req = request(app.getHttpServer());
    await createUser();
  });

  describe('Route: auth/login  Method: login - POST ', () => {
    it('should throw a Unauthorized when send invalid login or password ', async () => {
      const response = await req.post('/auth/login').send({ login: 'other_login', password: 'any_password' });

      expect(response.body.statusCode).toBe(HttpStatus.UNAUTHORIZED);
      expect(response.body.message).toBe(ErrorMessageHelper.PASSWORD_OR_EMAIL_INVALID);
    });

    it('should throw a Unauthorized when login is not send', async () => {
      const response = await req.post('/auth/login').send({ password: 'any_password' });
      expect(response.body.statusCode).toBe(HttpStatus.UNAUTHORIZED);
    });

    it('should throw a Unauthorized when password is not send', async () => {
      const response = await req.post('/auth/login').send({ login: 'other_login' });
      expect(response.body.statusCode).toBe(HttpStatus.UNAUTHORIZED);
    });

    it('should return a token when login successfully', async () => {
      const response = await req
        .post('/auth/login')
        .send({ login: 'any_login', password: 'any_password' })
        .expect(HttpStatus.OK);
      expect(response.body).toEqual({ token: expect.any(String) });
      token = response.body.token;
    });
  });

  describe('Route: auth/getUser  Method: getUserByToken - GET ', () => {
    it('should throw a Unauthorized when not send token ', async () => {
      await req.get('/auth/getUser').expect(HttpStatus.UNAUTHORIZED);
    });

    it('should throw a Unauthorized when token is not valid', async () => {
      await req
        .get('/auth/getUser')
        .set('Authorization', 'Bearer abcdefghijklmnopqrstuvwxyz')
        .expect(HttpStatus.UNAUTHORIZED);
    });

    it('should return a user when autheticated', async () => {
      const response = await authGet('/auth/getUser').expect(HttpStatus.OK);
      expect(response.body).toEqual(createdUser);
    });
  });
});
