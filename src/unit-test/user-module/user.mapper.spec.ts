import { CreateUserDTO, UpdatePasswordDTO, UpdateUserDTO, UserDTO } from '../../common/dtos/user';
import { User } from '../../modules/user/domain/User.entity';
import { CreateUserMapper, UpdatePasswordMapper, UpdateUserMapper, UserMapper } from '../../modules/user/mappers';

describe('UserRespository', () => {
  const user = new User();
  user.id = 'any_id';
  user.login = 'any_login';
  (user.email = 'any_email@mail.com'), (user.password = 'any_password');

  describe('UserMapper', () => {
    const usermapper = new UserMapper();
    it('should return entity', () => {
      const userDTO = new UserDTO();
      const entity = usermapper.toEntity(userDTO);
      expect(entity).toBeInstanceOf(User);
    });

    it('should return UserDTO', () => {
      const dto = usermapper.fromEntity(user);
      expect(dto).toBeInstanceOf(UserDTO);
    });
  });

  describe('UpdateUserMapper', () => {
    const updateUserMapper = new UpdateUserMapper();
    it('should return entity', () => {
      const userDTO = new UpdateUserDTO();
      const entity = updateUserMapper.toEntity(userDTO);
      expect(entity).toBeInstanceOf(User);
    });

    it('should return UpdateUserDTO', () => {
      const dto = updateUserMapper.fromEntity(user);
      expect(dto).toBeInstanceOf(UpdateUserDTO);
    });
  });

  describe('UpdatePasswordMapper', () => {
    const updatePasswordMapper = new UpdatePasswordMapper();
    it('should return entity', () => {
      const userDTO = new UpdatePasswordDTO();
      userDTO.newPassword = 'any_password';
      const entity = updatePasswordMapper.toEntity(userDTO);
      expect(entity).toBeInstanceOf(User);
    });

    it('should return UpdatePasswordDTO', () => {
      const dto = updatePasswordMapper.fromEntity(user);
      expect(dto).toBeInstanceOf(UpdatePasswordDTO);
    });
  });

  describe('CreateUserMapper', () => {
    const createUserMapper = new CreateUserMapper();
    it('should return entity', () => {
      const userDTO = new CreateUserDTO();
      const entity = createUserMapper.toEntity(userDTO);
      expect(entity).toBeInstanceOf(User);
    });

    it('should return CreateUserDTO', () => {
      const dto = createUserMapper.fromEntity(user);
      expect(dto).toBeInstanceOf(CreateUserDTO);
    });
  });
});
