import { Body, Controller, Inject, Post } from '@nestjs/common';
import { UserDTO } from '../../core/dtos/user/user.dto';
import { CreateUserDTO } from '../../core/dtos/user/create-user.dto';
import { UserService } from '../../services/user/user.service';
import { CreateUserMapper } from '../../core/mappers/user/create-user.mapper';

@Controller('user')
export class UserController {
  @Inject(CreateUserMapper)
  private readonly createUserMapper: CreateUserMapper;
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() userSignUp: CreateUserDTO): Promise<UserDTO> {
    const userEntity = this.createUserMapper.mapFrom(userSignUp);
    const response = await this.userService.create(userEntity);
    return this.createUserMapper.mapTo(response);
  }
}
