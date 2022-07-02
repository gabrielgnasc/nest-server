import { CreateUserDTO } from '../../../common/dtos/user/create-user.dto';
import { User } from '../domain/User.entity';
import { Mapper } from '../../../common/interfaces/user-interfaces';

export class CreateUserMapper extends Mapper<CreateUserDTO, User> {
  public toEntity(param: CreateUserDTO): User {
    const user = new User();
    user.name = param?.name;
    user.email = param?.email;
    user.login = param?.login;
    user.password = param?.password;

    return user;
  }

  public fromEntity(param: User): CreateUserDTO {
    const userDTO = new CreateUserDTO();
    userDTO.name = param?.name;
    userDTO.email = param?.email;
    userDTO.login = param?.login;
    return userDTO;
  }
}
