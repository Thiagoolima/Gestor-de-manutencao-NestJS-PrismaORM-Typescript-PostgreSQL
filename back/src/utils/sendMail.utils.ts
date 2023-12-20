import { BadRequestException, Injectable } from "@nestjs/common";
import { TransporterNodemailer } from "src/configs/nodemailer/transporter.nodemailer";
import { SendMailOptionsDTO } from "./dto/sendMailOptions.dto";

@Injectable()
export class SendMail {
    constructor(private transporter: TransporterNodemailer) {}

    async execute(options: SendMailOptionsDTO) {
        try {
            console.log(options)
            const transporter = this.transporter.getTransporter();
            await transporter.sendMail({
                from: `Gestor de manutenção<${process.env.MAIL_USER}>`,
                ...options
            });
        } catch (error) {
            throw new BadRequestException("An error occurred, the email was not sent")
        }
    }
}
