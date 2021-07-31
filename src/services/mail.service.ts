import * as nodemailer from 'nodemailer';
import 'dotenv/config';

class Mail {
  constructor(public to?: string, public subject?: string, public message?: string) {}

  public async configureMail(): Promise<void> {
    const nodeEnv = process.env.NODE_ENV || 'development';

    const message = {
      subject: `Database ${nodeEnv.toUpperCase()}`,
      message:
        `Database stop working on ${nodeEnv.toUpperCase()}<br>` +
        `Please validate the last log on Task Service and restart the process <br>` +
        `Thank you, <br>` +
        `Squads Notifier`,
      to: 'murillo_borgess@hotmail.com',
    };

    this.to = message.to;
    this.subject = message.subject;
    this.message = message.message;
    this.sendMail();
  }

  public sendMail(): void {
    const mailOptions = {
      from: process.env.MAIL,
      to: this.to,
      subject: this.subject,
      html: this.message,
    };

    const transporter = nodemailer.createTransport({
      service: process.env.MAIL_SERVICE,
      auth: { user: process.env.MAIL_USER, pass: process.env.MAIL_PASSWORD },
    });

    transporter.sendMail(mailOptions);
  }
}

export default new Mail();
