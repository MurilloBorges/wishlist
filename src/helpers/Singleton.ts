/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-empty-function */
export interface IUserToken {
  token: string;
  clientId: string;
}

class Singleton {
  private static instance: Singleton;

  private user: IUserToken | undefined;

  private constructor() {}

  public static get Instance() {
    const inst = this.instance || (this.instance = new this());
    return inst;
  }

  public setUser(user: IUserToken) {
    this.user = user;
  }

  public getUser(): IUserToken | undefined {
    return this.user;
  }
}

export default Singleton;
