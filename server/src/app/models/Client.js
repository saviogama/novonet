import Sequelize, { Model } from 'sequelize';
import bcrypt from 'bcryptjs';

class Client extends Model {
  static init(sequelize) {
    super.init({
      email: Sequelize.STRING,
      firstname: Sequelize.STRING,
      lastname: Sequelize.STRING,
      rg: Sequelize.STRING,
      cpf: Sequelize.STRING,
      code: Sequelize.STRING,
      status: Sequelize.BOOLEAN,
      client_type: Sequelize.BOOLEAN,
    }, {
      sequelize,
    });

    // this.addHook('beforeSave', async (client) => {
    //   if (client.code) {
    //     client.code = await bcrypt.hash(client.code, 8);
    //   }
    // });

    // return this;
  }

  // checkPassword(p) {
  //   return bcrypt.compare(p, this.password);
  // }
}

export default Client;
