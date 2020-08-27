import Admin from '../../models/Admin';

class AdminController {
  async store(request, response) {
    const adminExists = await Admin.count();

    if (adminExists >= 1) {
      return response
        .status(400)
        .json({ error: 'Admin already exists, impossible to create another.' });
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
