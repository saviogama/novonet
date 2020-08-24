import Admin from '../../models/Admin';

class AdminController {
  async store(request, response) {
    const adminId = request.userId;

    const adminMaster = await Admin.findOne({
      id: adminId,
      admin_master: true,
    });

    if (!adminMaster) {
      return response
        .status(400)
        .json({ error: 'You do not have access to this functionality!' });
    }

    const adminExists = await Admin.findOne({
      where: {
        email: request.body.email,
      },
    });

    if (adminExists) {
      return response.status(400).json({ error: 'Admin already exists.' });
    }

    const { id, email, name } = await Admin.create(request.body);

    return response.json({
      id,
      email,
      name,
    });
  }
}

export default new AdminController();
