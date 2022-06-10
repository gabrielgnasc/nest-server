import { Mapper } from '../../abstracts/mapper';
import { UserDTO } from '../../../common/dtos/user/user.dto';
import { User } from '../../entities/User.entity';
import { UpdateUserDTO } from '../../../common/dtos/user/update-user.dto';

export class UpdateUserMapper extends Mapper<UpdateUserDTO, User> {
  public toEntity(param: UpdateUserDTO): User {
    const user = new User();
    user.name = param.name;
    user.email = param.email;
    return user;
  }

  public toDTO(param: User): UpdateUserDTO {
    const userDTO = new UpdateUserDTO();
    userDTO.name = param.name;
    userDTO.email = param.email;
    return userDTO;
  }
}
