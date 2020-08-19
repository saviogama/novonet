const bcrypt = require('bcryptjs');

module.exports = {
  up: QueryInterface => {
    return QueryInterface.bulkInsert('admins', [{
      name: 'NovoNet',
      email: 'admin_master@gmail.com',
      password: bcrypt.hashSync('0123456789', 8),
      admin_master: true,
      admin_type: false,
      created_at: new Date(),
      updated_at: new Date(),
    }], {});
  },

  down: () => {},
};
