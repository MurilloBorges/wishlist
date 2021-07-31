/* eslint-disable no-useless-constructor */
export interface IUserToken {
  token: string;
  user: string;
  date?: Date;
  message?: string;
}

class Singleton {
  private static instance: Singleton;

  private token: IUserToken[];

  private constructor() {
    this.token = [];
  }

  public static get Instance() {
    const inst = this.instance || (this.instance = new this());
    return inst;
  }

  public setToken(token: IUserToken) {
    let userToken = this.token.filter(data => data.user !== token.user);
    if (!userToken) {
      userToken = [];
    }
    userToken.push(token);
    this.token = userToken;
  }

  public getTokens(): IUserToken[] {
    return this.token;
  }
}

export default Singleton;
