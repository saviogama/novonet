import Sequelize, { Model } from 'sequelize';

class Client extends Model {
  static init(sequelize) {
    super.init(
      {
        email: Sequelize.STRING,
        firstname: Sequelize.STRING,
        lastname: Sequelize.STRING,
        rg: Sequelize.STRING,
        cpf: Sequelize.STRING,
        code: Sequelize.STRING,
        status: Sequelize.BOOLEAN,
        client_type: Sequelize.BOOLEAN,
      },
      {
        sequelize,
      }
    );

    return this;
  }
}

export default Client;
