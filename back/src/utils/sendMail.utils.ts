import { BadRequestException, Injectable } from '@nestjs/common';
import { TransporterNodemailer } from 'src/configs/nodemailer/transporter.nodemailer';
import { SendMailOptionsDTO } from './dto/sendMailOptions.dto';
import { CompileHandlebars } from 'src/configs/handlebars/compile.handlbers';

@Injectable()
export class SendMail {
  constructor(
    private transporter: TransporterNodemailer,
    private compileHandlerbars: CompileHandlebars,
  ) {}

  async execute(options: SendMailOptionsDTO) {
    try {
      const html = await this.compileHandlerbars.readTemplate(options);
      options.html = html;
      const transporter = this.transporter.getTransporter();
      await transporter.sendMail({
        from: `Gestor de manutenção<${process.env.MAIL_USER}>`,
        ...options,
      });
    } catch (error) {
      throw new BadRequestException(
        'An error occurred, the email was not sent',
      );
    }
  }
}
