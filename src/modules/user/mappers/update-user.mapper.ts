import { UpdateUserDTO } from '../../../common/dtos/user/update-user.dto';
import { User } from '../domain/User.entity';
import { Mapper } from '../interfaces';

export class UpdateUserMapper extends Mapper<UpdateUserDTO, User> {
  public toEntity(param: UpdateUserDTO): User {
    const user = new User();
    user.name = param?.name;
    user.email = param?.email;
    return user;
  }

  public fromEntity(param: User): UpdateUserDTO {
    const userDTO = new UpdateUserDTO();
    userDTO.name = param?.name;
    userDTO.email = param?.email;
    return userDTO;
  }
}
