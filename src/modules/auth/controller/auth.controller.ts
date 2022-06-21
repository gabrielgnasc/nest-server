import { Controller, Inject, Post, Request, UseGuards } from '@nestjs/common';
import { IAuthService } from '../../../common/interfaces/auth-interfaces';
import { LocalAuthGuard } from '../guards/local-auth.guard';

@Controller('auth')
export class AuthController {
  @Inject(IAuthService)
  private readonly authService: IAuthService;

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req: any) {
    return await this.authService.login(req.user);
  }
}

