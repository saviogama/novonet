import Sequelize, { Model } from 'sequelize';
import { v4 } from 'uuid';

class Client extends Model {
  static init(sequelize) {
    super.init({
      email: Sequelize.STRING,
      firstname: Sequelize.STRING,
      lastname: Sequelize.STRING,
      rg: Sequelize.STRING,
      cpf: Sequelize.STRING,
      code: Sequelize.UUID,
      status: Sequelize.BOOLEAN,
      client_type: Sequelize.BOOLEAN,
    }, {
      sequelize,
    });

    this.addHook('beforeSave', (client) => {
      client.code = v4();
    });

    return this;
  }
}

export default Client;
