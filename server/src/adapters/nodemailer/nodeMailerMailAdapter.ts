import { MailAdapter, SendMailData } from "../mailAdapter";
import nodemailer from "nodemailer";

const transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "37073a7b5e0aa5",
    pass: "a24122dd9cb43b"
  }
});

export class NodeMailerMailAdapter implements MailAdapter {
  
  async sendMail({subject, body}: SendMailData) {
    await transport.sendMail({
      from: 'Equipe Feedget <oi@feedget.com>',
      to: 'Vinicius Costa <viniciuscosta1900@gmail.com>',
      subject,
      html: body
    })
  }
}