export abstract class IJwtService {
  abstract sign(payload: string | object | Buffer, options?: any): string;
}
