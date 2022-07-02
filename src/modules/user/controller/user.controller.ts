import {
  Body,
  Controller,
  Get,
  HttpCode,
  Inject,
  Param,
  Post,
  Put,
  UseGuards,
  Request,
  ForbiddenException,
} from '@nestjs/common';
import { CreateUserDTO, UserDTO, UpdateUserDTO, UpdatePasswordDTO } from '../../../common/dtos/user';
import { IUserService } from '../../../common/interfaces/user-interfaces';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { RecoverPasswordDTO } from '../../../common/dtos/user/recover-password.dto';
import { UserMapper } from '../mappers';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { RequestDTO } from '../../../common/dtos/auth/request.dto';
import { userIdMatch } from '../../../common/helpers';

@ApiTags('Users')
@Controller('user')
export class UserController {
  @Inject(UserMapper)
  private readonly userMapper: UserMapper;

  constructor(private readonly userService: IUserService) {}

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @ApiResponse({ status: 200, type: UserDTO })
  @ApiOperation({ description: 'Get user with id parameter', summary: 'Find User' })
  @ApiBearerAuth()
  async findById(@Request() req: RequestDTO, @Param('id') id: string): Promise<UserDTO> {
    if (!userIdMatch(req, id)) throw new ForbiddenException();
    const user = await this.userService.findById(id);
    return this.userMapper.fromEntity(user);
  }

  @Post()
  @ApiResponse({ status: 201, type: UserDTO })
  @ApiOperation({ description: 'Create a user in the application', summary: 'Create User' })
  async create(@Body() userSignUp: CreateUserDTO): Promise<UserDTO> {
    const user = await this.userService.create(userSignUp);
    return this.userMapper.fromEntity(user);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  @ApiResponse({ status: 200, type: UserDTO })
  @ApiOperation({ description: 'Update user name and/or email', summary: 'Update User' })
  @ApiBearerAuth()
  async update(
    @Request() req: RequestDTO,
    @Param('id') id: string,
    @Body() userUpdate: UpdateUserDTO,
  ): Promise<UserDTO> {
    if (!userIdMatch(req, id)) throw new ForbiddenException();
    const user = await this.userService.update(id, userUpdate);
    return this.userMapper.fromEntity(user);
  }

  @Put('updatePassword/:id')
  @HttpCode(204)
  @UseGuards(JwtAuthGuard)
  @ApiResponse({ status: 204 })
  @ApiOperation({ description: 'Update user passsword', summary: 'Update Password' })
  @ApiBearerAuth()
  async updatePassword(
    @Request() req: RequestDTO,
    @Param('id') id: string,
    @Body() updatePassword: UpdatePasswordDTO,
  ): Promise<void> {
    if (!userIdMatch(req, id)) throw new ForbiddenException();
    return this.userService.updatePassword(id, updatePassword);
  }

  @Post('recoverPassword')
  @HttpCode(202)
  @ApiResponse({ status: 202 })
  @ApiOperation({ description: 'Send email to reset user password', summary: 'Reset Password' })
  async recoverPassword(@Body() data: RecoverPasswordDTO): Promise<any> {
    const message = await this.userService.recoverPassword(data.email);
    return { message };
  }
}
