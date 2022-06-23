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
import { ApiCreatedResponse, ApiForbiddenResponse, ApiResponse, ApiTags } from '@nestjs/swagger';
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
  @ApiResponse({ status: 200, description: 'The record has been successfully updated.' })
  @ApiForbiddenResponse({ description: 'Forbidden.' })
  async findById(@Request() req: RequestDTO, @Param('id') id: string): Promise<UserDTO> {
    if (!userIdMatch(req, id)) throw new ForbiddenException();
    const user = await this.userService.findById(id);
    return this.userMapper.fromEntity(user);
  }

  @Post()
  @ApiCreatedResponse({ description: 'The record has been successfully updated.', type: UserDTO })
  @ApiResponse({ status: 406, description: 'When the email or login already in use.' })
  async create(@Body() userSignUp: CreateUserDTO): Promise<UserDTO> {
    const user = await this.userService.create(userSignUp);
    return this.userMapper.fromEntity(user);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  @ApiResponse({ status: 200, description: 'The record has been successfully updated.' })
  @ApiForbiddenResponse({ description: 'Forbidden.' })
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
  @ApiForbiddenResponse({ description: 'Forbidden' })
  @ApiResponse({ status: 204, description: 'The record has been successfully updated.' })
  async updatePassword(
    @Request() req: RequestDTO,
    @Param('id') id: string,
    @Body() updatePassword: UpdatePasswordDTO,
  ): Promise<void> {
    if (!userIdMatch(req, id)) throw new ForbiddenException();
    return this.userService.updatePassword(id, updatePassword);
  }

  @Post('recoverPassword')
  @HttpCode(204)
  @ApiResponse({ status: 204, description: 'The record has been successfully updated.' })
  async recoverPassword(@Body() data: RecoverPasswordDTO): Promise<string> {
    return this.userService.recoverPassword(data.email);
  }
}
