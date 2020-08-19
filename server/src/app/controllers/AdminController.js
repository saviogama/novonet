import Admin from '../models/Admin';

class AdminController {
  // async index(request, response) {
  //   const admins = await Admin.findAll({
  //     where: {
  //       id: request.params.id,
  //       admin_master: false,
  //       admin_type: true,
  //     },
  //     attributes: ['id', 'email', 'name'],
  //   });

  //   return response.json(admins);
  // };

  async store(request, response) {
    const adminExists = await Admin.findOne({
      where: {
        email: request.body.email,
      }
    });

    if (adminExists) {
      return response.status(400).json({ error: 'Admin already exists.' });
    }

    const {
      id,
      email,
      name,
      admin_type = true,
      admin_master = false,
    } = await Admin.create(request.body);

    return response.json({
      id,
      email,
      name,
      admin_type,
      admin_master,
    });
  }
}

export default new AdminController();
