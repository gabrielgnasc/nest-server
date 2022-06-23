import { BadRequestException, Inject, Injectable, InternalServerErrorException } from '@nestjs/common';
import { TokenDTO } from '../../../common/dtos/auth';
import { UserDTO } from '../../../common/dtos/user';
import { IAuthService, IJwtService } from '../../../common/interfaces/auth-interfaces';
import { IUserService } from '../../../common/interfaces/user-interfaces';
import { User } from '../../user/domain/User.entity';

@Injectable()
export class AuthService implements IAuthService {
	@Inject(IUserService)
	private readonly userService: IUserService;

	@Inject(IJwtService)
	private readonly jwtService: IJwtService;

	async getTokenByUser(data: UserDTO): Promise<string> {
		const response = await this.login(data);
		return response.token;
	}

	async login(data: UserDTO): Promise<TokenDTO> {
		if (!data || !data.id) throw new InternalServerErrorException('User is required');
		const payload = { sub: data.id, login: data.login };
		const tokenString = this.jwtService.sign(payload, { secret: process.env.JWT_SECRET_KEY });
		return new TokenDTO(tokenString);
	}

	async getUserByToken(data: string): Promise<User> {
		if (!data) throw new InternalServerErrorException('Token is required');

		const payload = this.jwtService.decode(data);
		if (!payload || !payload.sub) throw new BadRequestException('Token invalid');

		return await this.userService.findById(payload.sub);
	}

	async validateUser(loginOrEmail: string, password: string): Promise<User | null> {
		const user = await this.userService.findBy({ login: loginOrEmail, email: loginOrEmail, method: 'OR' });
		if (!user) return null;
		if (!user.comparePasswords(password)) return null;

		return user;
	}
}

