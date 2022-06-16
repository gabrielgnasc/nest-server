import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsEmail } from 'class-validator';

export class UpdateUserDTO {
  @ApiProperty({ required: true })
  @IsNotEmpty({ message: 'The name cannot be empty.' })
  @IsString({ message: 'The name must to be a string' })
  name: string;

  @ApiProperty({ required: true })
  @IsNotEmpty({ message: 'The email cannot be empty.' })
  @IsEmail({ message: 'The email is not valid' })
  email: string;
}
