import Sequelize, { Model } from 'sequelize';
import bcrypt from 'bcryptjs';

class Admin extends Model {
  static init(sequelize) {
    super.init(
      {
        email: Sequelize.STRING,
        password_entry: Sequelize.VIRTUAL,
        password: Sequelize.STRING,
        admin_type: Sequelize.BOOLEAN,
      },
      {
        sequelize,
      }
    );

    this.addHook('beforeSave', async (admin) => {
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

export default Admin;
