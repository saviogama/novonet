import Sequelize, { Model } from 'sequelize';
import bcrypt from 'bcryptjs';

class Partner extends Model {
  static init(sequelize) {
    super.init({
      email: Sequelize.STRING,
      name: Sequelize.STRING,
      company_name: Sequelize.STRING,
      rg: Sequelize.STRING,
      cpf: Sequelize.STRING,
      cnpj: Sequelize.STRING,
      password_entry: Sequelize.VIRTUAL,
      password: Sequelize.STRING,
      partner: Sequelize.BOOLEAN,
    }, {
      sequelize,
    });

    this.addHook('beforeSave', async (partner) => {
      if (partner.password_entry) {
        partner.password = await bcrypt.hash(partner.password_entry, 8);
      }
    });

    return this;
  }

  checkPassword(p) {
    return bcrypt.compare(p, this.password);
  }
}

export default Partner;
