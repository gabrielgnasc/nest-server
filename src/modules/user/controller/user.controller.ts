import { Body, Controller, Get, HttpCode, Param, Post, Put } from '@nestjs/common';
import { CreateUserDTO, UserDTO, UpdateUserDTO, UpdatePasswordDTO } from '../../../common/dtos/user';
import { IUserService } from '../interfaces';
import { ApiCreatedResponse, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Users')
@Controller('user')
export class UserController {
  constructor(private readonly userService: IUserService) {}

  @ApiOkResponse({
    description: 'Get user by id',
    type: UserDTO,
  })
  @ApiNotFoundResponse({
    description: 'User dont exists',
  })
  @Get(':id')
  async findById(@Param('id') id: string): Promise<UserDTO> {
    return this.userService.findById(id);
  }

  @ApiCreatedResponse({
    description: 'It creates a new user',
    type: UserDTO,
  })
  @Post()
  async create(@Body() userSignUp: CreateUserDTO): Promise<UserDTO> {
    return this.userService.create(userSignUp);
  }

  @Put(':id')
  @ApiOperation({ description: 'Update a user' })
  async update(@Param('id') id: string, @Body() userUpdate: UpdateUserDTO): Promise<UserDTO> {
    return this.userService.update(id, userUpdate);
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
  async recoverPassword(@Body() email: string): Promise<string> {
    return this.userService.recoverPassword(email);
  }
}
