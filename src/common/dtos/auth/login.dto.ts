import { ApiProperty } from '@nestjs/swagger';

export class LoginDTO {
	@ApiProperty({ required: true })
	login: string;

	@ApiProperty({ required: true })
	password: string;
}
