import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsEmail, Length } from 'class-validator';
import { DTOValidationMessageHelper } from '../../helpers';

export class CreateUserDTO {
  @ApiProperty({ required: true })
  @IsNotEmpty({ message: DTOValidationMessageHelper.THE_NAME_CANNOT_BE_EMPTY })
  @IsString({ message: DTOValidationMessageHelper.THE_NAME_MUST_TO_BE_A_STRING })
  name: string;

  @ApiProperty({ required: true })
  @IsNotEmpty({ message: DTOValidationMessageHelper.THE_EMAIL_CANNOT_BE_EMPTY })
  @IsEmail({ message: DTOValidationMessageHelper.THE_EMAIL_IS_NOT_VALID })
  email: string;

  @ApiProperty({ required: true })
  @IsNotEmpty({ message: DTOValidationMessageHelper.THE_LOGIN_CANNOT_BE_EMPTY })
  @IsString({ message: DTOValidationMessageHelper.THE_LOGIN_MUST_TO_BE_A_STRING })
  login: string;

  @ApiProperty({ required: true })
  @IsNotEmpty({ message: DTOValidationMessageHelper.THE_PASSWORD_CANNOT_BE_EMPTY })
  @Length(6, 20, { message: DTOValidationMessageHelper.THE_PASSWORD_MUST_BE_6_20_CHARACTERS })
  password: string;
}
