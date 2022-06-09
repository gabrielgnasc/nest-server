import { Mapper } from '../../abstracts/mapper';
import { UserDTO } from '../../../common/dtos/user/user.dto';
import { User } from '../../entities/User.entity';
import { UpdateUserDTO } from '../../../common/dtos/user/update-user.dto';

export class UpdateUserMapper extends Mapper<UpdateUserDTO, User, UserDTO> {
  public mapFrom(param: UpdateUserDTO): User {
    const user = new User();
    user.name = param.name;
    user.email = param.email;
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
