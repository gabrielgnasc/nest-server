export abstract class IJwtService {
	abstract sign(payload: string | object | Buffer, options?: any): string;
	abstract decode(token: string, options?: any): null | payload;
}

interface payload {
	sub: string;
	login: string;
}
