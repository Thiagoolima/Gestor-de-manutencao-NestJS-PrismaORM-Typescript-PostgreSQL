export type SendMailOptionsDTO = {
  to: string;
  name: string;
  subject: string;
  text?: string;
  html?: string;
  templatePath: string;
  activationLink: string;
};
