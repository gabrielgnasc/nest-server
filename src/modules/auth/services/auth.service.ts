import { Inject, Injectable, InternalServerErrorException } from '@nestjs/common';
import { TokenDTO } from '../../../common/dtos/auth';
import { UserDTO } from '../../../common/dtos/user';
import { ErrorMessageHelper } from '../../../common/helpers';
import { IAuthService, IJwtService } from '../../../common/interfaces/auth-interfaces';
import { IUserService } from '../../../common/interfaces/user-interfaces';
import { User } from '../../user/domain/User.entity';

@Injectable()
export class AuthService implements IAuthService {
  @Inject(IUserService)
  private readonly userService: IUserService;

  @Inject(IJwtService)
  private readonly jwtService: IJwtService;

  async login(data: UserDTO): Promise<TokenDTO> {
    if (!data || !data.id) throw new InternalServerErrorException(ErrorMessageHelper.USER_REQUIRED);
    const payload = { sub: data.id, login: data.login };
    const tokenString = this.jwtService.sign(payload, { secret: process.env.JWT_SECRET_KEY });
    return new TokenDTO(tokenString);
  }

  async validateUser(loginOrEmail: string, password: string): Promise<User | null> {
    const user = await this.userService.findBy({ login: loginOrEmail, email: loginOrEmail, method: 'OR' });
    if (!user) return null;
    if (!user.comparePasswords(password)) return null;

    return user;
  }
}

