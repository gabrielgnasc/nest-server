export interface ISendMail {
  to?: string;
  cc?: string;
  from?: string;
  subject?: string;
  text?: string;
  context?: {
    [name: string]: any;
  };
  template?: string;
}
