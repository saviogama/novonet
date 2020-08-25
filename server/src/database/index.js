import Sequelize from 'sequelize';

import Admin from '../app/models/Admin';
import Partner from '../app/models/Partner';
import Client from '../app/models/Client';

import databaseConfig from '../config/database';

const models = [Admin, Partner, Client];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);

    models.map((model) => model.init(this.connection));
  }
}

export default new Database();
