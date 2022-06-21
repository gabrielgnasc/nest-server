import { User } from '../../../modules/user/domain/User.entity';
import { TokenDTO } from '../../dtos/auth';
import { UserDTO } from '../../dtos/user';

export abstract class IAuthService {
  abstract getTokenByUser(data: UserDTO): Promise<string>;

  abstract getUserByToken(data: string): Promise<User>;

  abstract login(data: any): Promise<TokenDTO>;

  abstract validateUser(loginOrEmail: string, password: string): Promise<User | null>;
}
