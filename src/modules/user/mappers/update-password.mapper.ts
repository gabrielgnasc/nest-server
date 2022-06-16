import { UpdatePasswordDTO } from '../../../common/dtos/user/update-password.dto';
import { User } from '../domain/User.entity';
import { Mapper } from '../interfaces';

export class UpdatePasswordMapper extends Mapper<UpdatePasswordDTO, User> {
  public toEntity(param: UpdatePasswordDTO): User {
    const user = new User();
    user.password = param?.newPassword;
    return user;
  }

  public fromEntity(param: User): UpdatePasswordDTO {
    const userDTO = new UpdatePasswordDTO();
    userDTO.password = param.password;
    return userDTO;
  }
}
