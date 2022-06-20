import { Inject, Injectable } from '@nestjs/common';
import { UserDTO } from '../../../common/dtos/user';
import { IAuthService } from '../../../common/interfaces/auth-interfaces';
import { IUserService } from '../../../common/interfaces/user-interfaces';

@Injectable()
export class AuthService implements IAuthService {
  @Inject(IUserService)
  private readonly userService: IUserService;

  constructor() {}

  getTokenByUser(data: UserDTO): Promise<string> {
    throw new Error('Method not implemented.');
  }
  getUserByToken(data: string): Promise<UserDTO> {
    throw new Error('Method not implemented.');
  }
  login(data: any): Promise<UserDTO> {
    throw new Error('Method not implemented.');
  }
  async validateUser(loginOrEmail: string, password: string): Promise<any> {
    const user = await this.userService.findBy({ login: loginOrEmail, email: loginOrEmail, method: 'OR' });
    if (!user) return null;
    return null;
  }
}

