import { Body, Controller, Get, HttpCode, Inject, Param, Post, Put } from '@nestjs/common';
import { CreateUserDTO, UserDTO, UpdateUserDTO, UpdatePasswordDTO } from '../../../common/dtos/user';
import { IUserService } from '../../../common/interfaces/user-interfaces';
import { ApiCreatedResponse, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { RecoverPasswordDTO } from '../../../common/dtos/user/recover-password.dto';
import { UserMapper, CreateUserMapper, UpdateUserMapper, UpdatePasswordMapper } from '../mappers';

@ApiTags('Users')
@Controller('user')
export class UserController {
  @Inject(UserMapper)
  private readonly userMapper: UserMapper;

  constructor(private readonly userService: IUserService) {}

  @Get(':id')
  @ApiOperation({ description: 'User dont exists' })
  async findById(@Param('id') id: string): Promise<UserDTO> {
    const user = await this.userService.findById(id);
    return this.userMapper.fromEntity(user);
  }

  @Post()
  @ApiOperation({ description: 'It creates a new user' })
  async create(@Body() userSignUp: CreateUserDTO): Promise<UserDTO> {
    const user = await this.userService.create(userSignUp);
    return this.userMapper.fromEntity(user);
  }

  @Put(':id')
  @ApiOperation({ description: 'Update a user' })
  async update(@Param('id') id: string, @Body() userUpdate: UpdateUserDTO): Promise<UserDTO> {
    const user = await this.userService.update(id, userUpdate);
    return this.userMapper.fromEntity(user);
  }

  @Put('updatePassword/:id')
  @HttpCode(204)
  @ApiOperation({ description: 'Update a password' })
  async updatePassword(@Param('id') id: string, @Body() updatePassword: UpdatePasswordDTO): Promise<void> {
    return this.userService.updatePassword(id, updatePassword);
  }

  @Post('recoverPassword')
  @HttpCode(204)
  @ApiOperation({ description: 'recover a password' })
  async recoverPassword(@Body() data: RecoverPasswordDTO): Promise<string> {
    return this.userService.recoverPassword(data.email);
  }
}
