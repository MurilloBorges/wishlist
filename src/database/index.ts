import databaseConfig from '../config/database';

class Database {
  connection: Promise<void> | undefined;

  constructor() {
    this.init();
  }

  init() {
    this.connection = databaseConfig;
  }
}

export default new Database();
