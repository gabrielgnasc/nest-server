import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsEmail, Length } from 'class-validator';

export class CreateUserDTO {
  @IsNotEmpty({ message: 'The name cannot be empty.' })
  @IsString({ message: 'The name must to be a string' })
  @ApiProperty({ required: true })
  name: string;

  @IsNotEmpty({ message: 'The email cannot be empty.' })
  @IsEmail({ message: 'The email is not valid' })
  @ApiProperty({ required: true })
  email: string;

  @IsNotEmpty({ message: 'The login cannot be empty.' })
  @IsString({ message: 'The login must to be a string' })
  @ApiProperty({ required: true })
  login: string;

  @IsNotEmpty({ message: 'The password cannot be empty.' })
  @Length(6, 20, { message: 'The password must be 6 to 20 characters' })
  @ApiProperty({ required: true })
  password: string;
}
