import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsEmail } from 'class-validator';
import { DTOValidationMessageHelper } from '../../helpers';

export class UpdateUserDTO {
  @ApiProperty({ required: true })
  @IsNotEmpty({ message: DTOValidationMessageHelper.THE_NAME_CANNOT_BE_EMPTY })
  @IsString({ message: DTOValidationMessageHelper.THE_NAME_MUST_TO_BE_A_STRING })
  name: string;

  @ApiProperty({ required: true })
  @IsNotEmpty({ message: DTOValidationMessageHelper.THE_EMAIL_CANNOT_BE_EMPTY })
  @IsEmail({ message: DTOValidationMessageHelper.THE_EMAIL_IS_NOT_VALID })
  email: string;
}
