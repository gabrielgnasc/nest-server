import { Body, Controller, Inject, Param, Post, Put } from '@nestjs/common';
import { UserDTO } from '../../common/dtos/user/user.dto';
import { CreateUserDTO } from '../../common/dtos/user/create-user.dto';
import { UserService } from '../../services/user/user.service';
import { UpdateUserDTO } from '../../common/dtos/user/update-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() userSignUp: CreateUserDTO): Promise<UserDTO> {
    return this.userService.create(userSignUp);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() userUpdate: UpdateUserDTO) {
    return this.userService.update(id, userUpdate);
  }
}
