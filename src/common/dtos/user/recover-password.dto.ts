import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsEmail } from 'class-validator';

export class RecoverPasswordDTO {
  @ApiProperty({ required: true })
  @IsNotEmpty({ message: 'The email cannot be empty.' })
  @IsEmail({ message: 'The password must to be a string' })
  email: string;
}
