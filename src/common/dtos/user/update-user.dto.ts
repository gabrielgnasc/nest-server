import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsEmail } from 'class-validator';

export class UpdateUserDTO {
  @IsNotEmpty({ message: 'The name cannot be empty.' })
  @IsString({ message: 'The name must to be a string' })
  @ApiProperty({ required: true })
  name: string;

  @IsNotEmpty({ message: 'The email cannot be empty.' })
  @IsEmail({ message: 'The email is not valid' })
  @ApiProperty({ required: true })
  email: string;
}
