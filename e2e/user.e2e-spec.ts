import * as request from 'supertest';
import { app } from './settings/setup';
import { DTOValidationMessageHelper, ErrorMessageHelper } from '../src/common/helpers';
import { UserDTO } from '../src/common/dtos/user';
import { HttpStatus } from '@nestjs/common';

describe('UserController (e2e)', () => {
  let createdUser: UserDTO;
  let token: string;
  let req: request.SuperTest<request.Test>;
  let otherId: string;

  const login = async () => {
    const { body } = await request(app.getHttpServer())
      .post('/auth/login')
      .send({ login: 'any_login', password: 'any_password' });
    token = body.token;
  };

  const authPut = (url: string) => {
    return req.put(url).set('Authorization', `Bearer ${token}`);
  };
  const authGet = (url: string) => {
    return req.get(url).set('Authorization', `Bearer ${token}`);
  };

  beforeAll(async () => {
    req = request(app.getHttpServer());
  });

  describe('Route: user/  Method: Create - POST', () => {
    it('should BadRequest when all params are empty', async () => {
      const createUser = {
        login: '',
        password: '',
        name: '',
        email: '',
      };
      const response = await req.post('/user').send(createUser);
      expect(response.body.statusCode).toBe(HttpStatus.BAD_REQUEST);
      expect(response.body.message).toContain(DTOValidationMessageHelper.THE_NAME_CANNOT_BE_EMPTY);
      expect(response.body.message).toContain(DTOValidationMessageHelper.THE_EMAIL_IS_NOT_VALID);
      expect(response.body.message).toContain(DTOValidationMessageHelper.THE_PASSWORD_MUST_BE_6_20_CHARACTERS);
      expect(response.body.message).toContain(DTOValidationMessageHelper.THE_PASSWORD_CANNOT_BE_EMPTY);
      expect(response.body.message).toContain(DTOValidationMessageHelper.THE_LOGIN_CANNOT_BE_EMPTY);
      expect(response.body.message).toContain(DTOValidationMessageHelper.THE_EMAIL_CANNOT_BE_EMPTY);
      expect(response.body.message).toContain(DTOValidationMessageHelper.THE_PASSWORD_CANNOT_BE_EMPTY);
    });

    it('should NotAcceptable when email is not an email', async () => {
      const createUser = {
        login: 'login',
        password: 'any_password',
        name: 'any_Name',
        email: 'any_login',
      };
      const response = await req.post('/user').send(createUser);
      expect(response.body.statusCode).toBe(HttpStatus.BAD_REQUEST);
      expect(response.body.message).toEqual([DTOValidationMessageHelper.THE_EMAIL_IS_NOT_VALID]);
    });

    it('should NotAcceptable when password is short', async () => {
      const createUser = {
        login: 'any_login',
        password: '1234',
        name: 'any_Name',
        email: 'any_login@mail.com',
      };
      const response = await req.post('/user').send(createUser);
      expect(response.body.statusCode).toBe(HttpStatus.BAD_REQUEST);
      expect(response.body.message).toEqual([DTOValidationMessageHelper.THE_PASSWORD_MUST_BE_6_20_CHARACTERS]);
    });

    it('should return a user when created', async () => {
      const createUser = {
        login: 'any_login',
        password: 'any_password',
        name: 'any_name',
        email: 'any_login@mail.com',
      };
      const response = await req.post('/user').send(createUser).expect(HttpStatus.CREATED);
      expect(response.body).toEqual({
        id: expect.any(String),
        login: 'any_login',
        name: 'any_name',
        email: 'any_login@mail.com',
      });
      createdUser = response.body;
      await login();
    });

    it('should return NotAcceptableException when email already in use', async () => {
      const createUser = {
        login: 'other_login',
        password: 'other_password',
        name: 'other_name',
        email: 'any_login@mail.com',
      };
      req
        .post('/user')
        .send(createUser)
        .expect(HttpStatus.NOT_ACCEPTABLE)
        .expect(ErrorMessageHelper.EMAIL_ALREADY_USED);
    });

    it('should return NotAcceptableException when login already in use', async () => {
      const createUser = {
        login: 'other_login',
        password: 'other_password',
        name: 'any_name',
        email: 'other_email@mail.com',
      };
      req
        .post('/user')
        .send(createUser)
        .expect(HttpStatus.NOT_ACCEPTABLE)
        .expect(ErrorMessageHelper.LOGIN_ALREADY_USED);
    });

    it('should return a other user when is created', async () => {
      const createUser = {
        login: 'other_login',
        password: 'other_password',
        name: 'other_name',
        email: 'other_email@mail.com',
      };
      const response = await req.post('/user').send(createUser).expect(HttpStatus.CREATED);
      expect(response.body).toEqual({
        id: expect.any(String),
        login: 'other_login',
        name: 'other_name',
        email: 'other_email@mail.com',
      });
      otherId = response.body.id;
    });
  });

  describe('Route: user/{id}  Method: findById - GET', () => {
    it('should return Unauthorized when dont have authorization header', () => {
      return req.get('/user/' + createdUser.id).expect(HttpStatus.UNAUTHORIZED);
    });

    it('should return Forbiden when user try get other user', () => {
      return authGet('/user/' + otherId).expect(HttpStatus.FORBIDDEN);
    });

    it('should return user with id especified', () => {
      return authGet('/user/' + createdUser.id)
        .expect(HttpStatus.OK)
        .expect(createdUser);
    });
  });

  describe('Route: user/{id}  Method: update - PUT', () => {
    it('should return Unauthorized when dont have authorization header', () => {
      return req
        .put('/user/' + createdUser.id)
        .send({ name: 'any_name', email: 'any_email@mail.com' })
        .expect(HttpStatus.UNAUTHORIZED);
    });

    it('should return Forbiden when user try update other user', () => {
      return authPut('/user/' + otherId)
        .send({ name: 'any_name', email: 'any_email@mail.com' })
        .expect(HttpStatus.FORBIDDEN);
    });

    it('should return NotAcceptableException when email already in use', async () => {
      const response = await authPut('/user/' + createdUser.id).send({
        name: 'any_name',
        email: 'other_email@mail.com',
      });

      expect(response.body.statusCode).toBe(HttpStatus.NOT_ACCEPTABLE);
      expect(response.body.message).toEqual(ErrorMessageHelper.EMAIL_ALREADY_USED);
    });

    it('should return user when updated successfully', async () => {
      const response = await authPut('/user/' + createdUser.id)
        .send({ name: 'any_name', email: 'any_email2@mail.com' })
        .expect(HttpStatus.OK);

      createdUser = response.body;
    });
  });

  describe('Route: user/updatePassword/{id}  Method: updatePassword - PUT', () => {
    it('should return Unauthorized when dont have authorization header', () => {
      return req
        .put('/user/updatePassword/' + createdUser.id)
        .send({ password: 'any_password', newPassword: 'other_password' })
        .expect(HttpStatus.UNAUTHORIZED);
    });

    it('should return Forbiden when user try update other user', () => {
      return authPut('/user/updatePassword/' + otherId)
        .send({ password: 'any_password', newPassword: 'other_password' })
        .expect(HttpStatus.FORBIDDEN);
    });

    it('should return NotAcceptableException when passwords some equals', async () => {
      const response = await authPut('/user/updatePassword/' + createdUser.id).send({
        password: 'any_password',
        newPassword: 'any_password',
      });
      expect(response.body.statusCode).toBe(HttpStatus.NOT_ACCEPTABLE);
      expect(response.body.message).toEqual(ErrorMessageHelper.NEW_PASSWORD_IS_NOT_VALID);
    });

    it('should return NoContent when updated password successfully', () => {
      return authPut('/user/updatePassword/' + createdUser.id)
        .send({ password: 'any_password', newPassword: 'other_password' })
        .expect(HttpStatus.NO_CONTENT);
    });
  });

  describe('Route: user/recoverPassword/  Method: recoverPassword - POST', () => {
    it('should return NotFound when email dont exists', async () => {
      const response = await req.post('/user/recoverPassword/').send({ email: 'not_email@email.com' });
      expect(response.body.statusCode).toBe(HttpStatus.NOT_FOUND);
      expect(response.body.message).toEqual(ErrorMessageHelper.UNREGISTERED_EMAIL);
    });

    it('should return BadRequest when email is unformatted', async () => {
      const response = await req.post('/user/recoverPassword/').send({ email: 'not_emailcom' });
      expect(response.body.statusCode).toBe(HttpStatus.BAD_REQUEST);
      expect(response.body.message).toEqual([DTOValidationMessageHelper.THE_EMAIL_IS_NOT_VALID]);
    });

    it('should return a message when email has sent successfully', async () => {
      const response = await req
        .post('/user/recoverPassword/')
        .send({ email: createdUser.email })
        .expect(HttpStatus.ACCEPTED);

      expect(response.body.message).toEqual(ErrorMessageHelper.EMAIL_SUCCESSFULLY_SENT);
    });
  });
});
