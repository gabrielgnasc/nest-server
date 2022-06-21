import { Inject, Injectable } from '@nestjs/common';
import { TokenDTO } from '../../../common/dtos/auth';
import { UserDTO } from '../../../common/dtos/user';
import { IAuthService, IJwtService } from '../../../common/interfaces/auth-interfaces';
import { IUserService } from '../../../common/interfaces/user-interfaces';
import { User } from '../../user/domain/User.entity';

@Injectable()
export class AuthService implements IAuthService {
  @Inject(IUserService)
  private readonly userService: IUserService;

  @Inject(IJwtService)
  private readonly jwtService: IJwtService;

  getTokenByUser(data: UserDTO): Promise<string> {
    throw new Error('Method not implemented.');
  }
  getUserByToken(data: string): Promise<User> {
    throw new Error('Method not implemented.');
  }

  async login(data: UserDTO): Promise<TokenDTO> {
    const payload = { sub: data.id, login: data.login };
    const token = new TokenDTO(this.jwtService.sign(payload, { secret: process.env.JWT_SECRET_KEY }));
    return token;
  }

  async validateUser(loginOrEmail: string, password: string): Promise<User | null> {
    const user = await this.userService.findBy({ login: loginOrEmail, email: loginOrEmail, method: 'OR' });
    if (!user) return null;
    if (!user.comparePasswords(password)) return null;

    return user;
  }
}

