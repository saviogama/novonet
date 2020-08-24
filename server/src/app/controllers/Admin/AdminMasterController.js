import Admin from '../../models/Admin';

class AdminMasterController {
  async store(request, response) {
    const adminMasterExists = await Admin.findOne({
      where: {
        admin_master: true,
      },
    });

    if (adminMasterExists) {
      return response.status(400).json({
        error:
          'Admin Master already exists, it is not allowed to create another.',
      });
    }

    const {
      id,
      email,
      name,
      admin_type = false,
      admin_master = true,
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

export default new AdminMasterController();
