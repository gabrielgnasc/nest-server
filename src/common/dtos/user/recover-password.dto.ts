import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsEmail } from 'class-validator';
import { DTOValidationMessageHelper } from '../../helpers';

export class RecoverPasswordDTO {
  @ApiProperty({ required: true })
  @IsNotEmpty({ message: DTOValidationMessageHelper.THE_EMAIL_CANNOT_BE_EMPTY })
  @IsEmail({ message: DTOValidationMessageHelper.THE_EMAIL_IS_NOT_VALID })
  email: string;
}
