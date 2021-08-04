import * as nodemailer from 'nodemailer';

import Constants from '../constants/Constants';
import logger from '../log/logger';
import AppError from '../errors/AppError';
import IErrors from '../errors/IErrors';

interface IEmail {
  to: string;
  subject: string;
  message: string;
}

class MailService {
  private to: string;

  private subject: string;

  private message: string;

  constructor(to: string, subject: string, message: string) {
    this.to = to;
    this.subject = subject;
    this.message = message;
    this.configureMail();
  }

  public async configureMail(): Promise<void> {
    const message: IEmail = {
      to: this.to,
      subject: this.subject,
      message: this.message,
    };

    this.to = message.to;
    this.subject = message.subject;
    this.message = message.message;
  }

  public sendMail(): void {
    try {
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
    } catch (error) {
      logger.error('[MailService][sendMail] error', {
        field: '[MailService][sendMail]',
        message: this.message,
        error,
      });
      throw new AppError(500, [IErrors.client.failedToSendEmail]);
    }
  }
}

export default MailService;
