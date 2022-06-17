import { UserDTO } from '../../../common/dtos/user';
import { ISendMail } from './send-email.dto';

export abstract class IEmailService {
  abstract sendRecoverPasswordEmail(user: UserDTO): Promise<void>;
  abstract sendMail(data: ISendMail): Promise<void>;
}
