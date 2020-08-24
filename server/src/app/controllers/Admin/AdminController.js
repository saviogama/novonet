import Admin from '../../models/Admin';

class AdminController {
  async store(request, response) {
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
