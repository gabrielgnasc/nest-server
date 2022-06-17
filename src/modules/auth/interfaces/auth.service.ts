import { UserDTO } from '../../../common/dtos/user';

export abstract class IAuthService {
  abstract getTokenByUser(data: UserDTO): Promise<string>;
}
