export interface ISendMail {
  to?: string;
  cc?: string;
  bcc?: string;
  replyTo?: string;
  inReplyTo?: string;
  from?: string;
  subject?: string;
  text?: string | Buffer;
  html?: string | Buffer;
  sender?: string;
  raw?: string | Buffer;
  references?: string | string[];
  encoding?: string;
  date?: Date | string;
  headers?: Headers;
  context?: {
    [name: string]: any;
  };
  transporterName?: string;
  template?: string;
}
