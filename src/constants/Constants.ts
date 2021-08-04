import 'dotenv/config';

export default class Constants {
  public static readonly DATE_TIME_PATTERN = 'DD/MM/YYYY HH:mm:ss';

  public static readonly NODE_ENV = process.env.NODE_ENV;

  public static readonly APP_SECRET = process.env.APP_SECRET;

  public static readonly DATABASE_HOST = process.env.DATABASE_HOST;

  public static readonly API_CHALLENGE = process.env.API_CHALLENGE;

  public static readonly LOG_INDEX = process.env.LOG_INDEX;

  public static readonly LOG_USER = process.env.LOG_USER;

  public static readonly LOG_PASSWORD = process.env.LOG_PASSWORD;

  public static readonly MAIL_SERVICE = process.env.MAIL_SERVICE;

  public static readonly MAIL_HOST = process.env.MAIL_HOST;

  public static readonly MAIL_PORT = process.env.MAIL_PORT;

  public static readonly MAIL_SECURE = process.env.MAIL_SECURE;

  public static readonly MAIL_USER = process.env.MAIL_USER;

  public static readonly MAIL_PASSWORD = process.env.MAIL_PASSWORD;

  public static readonly MAIL_DEFAULT = process.env.MAIL_DEFAULT;

  public static readonly MAIL_FROM = process.env.MAIL_FROM;

  public static readonly HOST = 'http://localhost:3333';
}
