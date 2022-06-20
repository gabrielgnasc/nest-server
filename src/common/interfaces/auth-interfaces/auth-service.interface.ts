import { UserDTO } from '../../dtos/user';

export abstract class IAuthService {
  abstract getTokenByUser(data: UserDTO): Promise<string>;

  abstract getUserByToken(data: string): Promise<UserDTO>;

  abstract login(data: any): Promise<UserDTO>;

  abstract validateUser(login: string, password: string): Promise<any>;
}
