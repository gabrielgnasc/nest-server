export abstract class IEmailService {
  abstract sendRecoverPasswordEmail(id: string): Promise<void>;
}
