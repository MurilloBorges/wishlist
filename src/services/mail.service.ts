import * as nodemailer from 'nodemailer';
import Constants from '../constants/Constants';

class Mail {
  constructor(public to?: string, public subject?: string, public message?: string) {}

  public async configureMail(): Promise<void> {
    const nodeEnv = Constants.NODE_ENV || 'development';

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
      from: Constants.MAIL_FROM,
      to: this.to,
      subject: this.subject,
      html: this.message,
    };

    const transporter = nodemailer.createTransport({
      service: Constants.MAIL_SERVICE,
      auth: { user: Constants.MAIL_USER, pass: Constants.MAIL_PASSWORD },
    });

    transporter.sendMail(mailOptions);
  }
}

export default new Mail();
