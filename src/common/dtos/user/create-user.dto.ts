import { IsNotEmpty, IsString, IsEmail, Length } from 'class-validator';

export class CreateUserDTO {
  @IsNotEmpty({ message: 'The name cannot be empty.' })
  @IsString({ message: 'The name must to be a string' })
  name: string;

  @IsNotEmpty({ message: 'The email cannot be empty.' })
  @IsEmail({ message: 'The email is not valid' })
  email: string;

  @IsNotEmpty({ message: 'The login cannot be empty.' })
  @IsString({ message: 'The login must to be a string' })
  login: string;

  @IsNotEmpty({ message: 'The name cannot be empty.' })
  @Length(6, 20, { message: 'The password must be 6 to 20 characters' })
  password: string;
}
