import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserDTO } from 'src/core/dtos/user/user.dto';
import { User } from 'src/core/entities/User.entity';
import { CreateUserDTO } from '../../core/dtos/user/create-user.dto';
import { UserService } from '../../services/user/user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async findUser() {
    return this.userService.findAll();
  }

  @Post()
  create(@Body() userSignUp: CreateUserDTO): Promise<UserDTO> {
    const userEntity = userSignUp as User;
    return this.userService.create(userEntity);
  }
}
