import nodemailer from 'nodemailer';
import { MailAdapter, SendMailData } from "../mail-adapter";

const transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "32be26ecb1d566",
    pass: "216125421bf5f7"
  }
});

export class NodeMailerMailAdapter implements MailAdapter{
  async sendMail({ subject, body }: SendMailData){
    await transport.sendMail({
      from: 'Equipe Feedget <oi@feedget.com>',
      to: 'Arisson Lima <arissonlima@gmail.com>',
      subject,
      html: body,
    });
  }
}