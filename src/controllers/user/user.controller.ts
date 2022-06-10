import { Body, Controller, Inject, Param, Post, Put } from '@nestjs/common';
import { UserDTO } from '../../common/dtos/user/user.dto';
import { CreateUserDTO } from '../../common/dtos/user/create-user.dto';
import { UserService } from '../../services/user/user.service';
import { UpdateUserDTO } from '../../common/dtos/user/update-user.dto';
import { UpdatePasswordDTO } from '../../common/dtos/user/update-password.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() userSignUp: CreateUserDTO): Promise<UserDTO> {
    return this.userService.create(userSignUp);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() userUpdate: UpdateUserDTO,
  ): Promise<UserDTO> {
    return this.userService.update(id, userUpdate);
  }

  @Put('updatePassword/:id')
  async updatePassword(
    @Param('id') id: string,
    @Body() updatePassword: UpdatePasswordDTO,
  ): Promise<void> {
    return this.userService.updatePassword(id, updatePassword);
  }

  @Post('recoverPassword')
  async recoverPassword(@Body() email: string): Promise<string> {
    return this.userService.recoverPassword(email);
  }
}
