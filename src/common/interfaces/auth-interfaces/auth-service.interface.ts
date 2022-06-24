import { User } from '../../../modules/user/domain/User.entity';
import { TokenDTO } from '../../dtos/auth';
export abstract class IAuthService {
  abstract login(data: any): Promise<TokenDTO>;

  abstract validateUser(loginOrEmail: string, password: string): Promise<User | null>;
}
