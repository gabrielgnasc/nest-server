import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, Length } from 'class-validator';
import { DTOValidationMessageHelper } from '../../helpers';

export class UpdatePasswordDTO {
  @ApiProperty({ required: true })
  @IsNotEmpty({ message: DTOValidationMessageHelper.THE_PASSWORD_CANNOT_BE_EMPTY })
  @Length(6, 20, { message: DTOValidationMessageHelper.THE_PASSWORD_MUST_BE_6_20_CHARACTERS })
  password: string;

  @ApiProperty({ required: true })
  @IsNotEmpty({ message: DTOValidationMessageHelper.THE_PASSWORD_CANNOT_BE_EMPTY })
  @Length(6, 20, { message: DTOValidationMessageHelper.THE_PASSWORD_MUST_BE_6_20_CHARACTERS })
  newPassword: string;
}
