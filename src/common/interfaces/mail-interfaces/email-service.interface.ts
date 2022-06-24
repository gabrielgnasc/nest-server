import { UserDTO } from '../../dtos/user';
import { ISendMail } from './send-email.dto';

export abstract class IEmailService {
	abstract sendRecoverPasswordEmail(user: UserDTO, token: string): Promise<void>;
	abstract sendMail(data: ISendMail): Promise<void>;
}
