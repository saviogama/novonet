import Sequelize, { Model } from 'sequelize';
import bcrypt from 'bcryptjs';

class Partner extends Model {
  static init(sequelize) {
    super.init({
      name: Sequelize.STRING,
      password_entry: Sequelize.VIRTUAL,
      password: Sequelize.STRING,
      admin: Sequelize.BOOLEAN,
    }, {
      sequelize,
    });

    this.addHook('beforeSave', async (admin) => {
      // admin.name = 'admin';

      if (admin.password_entry) {
        admin.password = await bcrypt.hash(admin.password_entry, 10);
      }
    });

    return this;
  }

  checkPassword(p) {
    return bcrypt.compare(p, this.password);
  }
}

export default Partner;
