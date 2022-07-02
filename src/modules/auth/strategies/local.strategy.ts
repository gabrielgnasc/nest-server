import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { ErrorMessageHelper } from '../../../common/helpers';
import { IAuthService } from '../../../common/interfaces/auth-interfaces';
import { IGenericStrategy } from '../../../common/interfaces/auth-interfaces';

@Injectable()
export class LocaStrategy extends PassportStrategy(Strategy, 'local') implements IGenericStrategy {
  @Inject(IAuthService)
  private readonly authService: IAuthService;

  constructor() {
    super({
      usernameField: 'login',
    });
  }

  async validate(login: string, password: string) {
    const user = await this.authService.validateUser(login, password);
    if (!user) throw new UnauthorizedException(ErrorMessageHelper.PASSWORD_OR_EMAIL_INVALID);
    return user;
  }
}
