import { UserDTO } from '../../../common/dtos/user/user.dto';
import { Mapper } from '../../abstracts/mapper';
import { User } from '../../entities/User.entity';

export class UserMapper extends Mapper<UserDTO, User> {
  public toEntity(param: UserDTO): User {
    const user = new User();
    user.name = param.name;
    user.email = param.email;
    user.login = param.login;
    user.id = param.id;
    return user;
  }
  public toDTO(param: User): UserDTO {
    const user = new UserDTO();
    user.name = param.name;
    user.email = param.email;
    user.login = param.login;
    user.id = param.id;
    return user;
  }
}
