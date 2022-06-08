import { Mapper } from '../../abstracts/mapper';
import { CreateUserDTO } from '../../dtos/user/create-user.dto';
import { UserDTO } from '../../dtos/user/user.dto';
import { User } from '../../entities/User.entity';

export class CreateUserMapper extends Mapper<CreateUserDTO, User, UserDTO> {
  public mapFrom(param: CreateUserDTO): User {
    const user = new User();
    user.name = param.name;
    user.email = param.email;
    user.login = param.login;
    user.password = param.password;

    return user;
  }

  public mapTo(param: User): UserDTO {
    const userDTO = new UserDTO();
    userDTO.name = param.name;
    userDTO.email = param.email;
    userDTO.login = param.login;
    userDTO.id = param.id;
    return userDTO;
  }
}
