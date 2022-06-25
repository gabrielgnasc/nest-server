import { BadRequestException, Body, Controller, Get, Inject, Post, Request, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { LoginDTO, RequestDTO, TokenDTO } from '../../../common/dtos/auth';
import { UserDTO } from '../../../common/dtos/user';
import { MessagesHelper } from '../../../common/helpers';
import { IAuthService } from '../../../common/interfaces/auth-interfaces';
import { IUserService } from '../../../common/interfaces/user-interfaces';
import { UserMapper } from '../../user/mappers';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { LocalAuthGuard } from '../guards/local-auth.guard';
@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  @Inject(UserMapper)
  private readonly userMapper: UserMapper;

  @Inject(IAuthService)
  private readonly authService: IAuthService;

  @Inject(IUserService)
  private readonly userService: IUserService;

  @Post('login')
  @UseGuards(LocalAuthGuard)
  @ApiResponse({ status: 200, type: TokenDTO })
  @ApiOperation({ description: 'Authenticate user in application', summary: 'Authenticate' })
  async login(@Request() req: any, @Body() LoginDTO: LoginDTO): Promise<TokenDTO> {
    if (!req?.user) throw new BadRequestException(MessagesHelper.USER_REQUIRED);
    return await this.authService.login(req.user);
  }

  @Get('getUser')
  @UseGuards(JwtAuthGuard)
  @ApiResponse({ status: 200, type: UserDTO })
  @ApiOperation({ description: 'Get user by token in header', summary: 'Find User By Token' })
  @ApiBearerAuth()
  async getUserByToken(@Request() req: RequestDTO): Promise<UserDTO> {
    if (!req?.user?.id) throw new BadRequestException(MessagesHelper.INVALID_TOKEN);
    const user = await this.userService.findById(req.user.id);
    return this.userMapper.fromEntity(user);
  }
}

