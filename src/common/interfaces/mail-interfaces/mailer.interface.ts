import { ISendMail } from './send-email.dto';

export abstract class IMailer {
  abstract sendMail(sendMailOptions: ISendMail): Promise<any>;
}
