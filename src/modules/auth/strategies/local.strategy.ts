import { Inject, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { MessagesHelper } from '../../../common/helpers';
import { IAuthService } from '../../../common/interfaces/auth-interfaces';

export class LocaStrategy extends PassportStrategy(Strategy) {
  @Inject(IAuthService)
  private readonly authService: IAuthService;

  constructor() {
    super({
      usernameField: 'login',
    });
  }

  async validate(login: string, password: string) {
    const user = await this.authService.validateUser(login, password);
    if (!user) throw new UnauthorizedException(MessagesHelper.PASSWORD_OR_EMAIL_INVALID);
    return user;
  }
}
