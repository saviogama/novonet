import Admin from '../../models/Admin';

class AdminController {
  async store(request, response) {
    const adminExists = await Admin.count();

    if (adminExists >= 1) {
      return response
        .status(400)
        .json({ error: 'Admin already exists, impossible to create another.' });
    }

    const { email, password_entry } = await Admin.create(request.body);

    return response.json({
      email,
      password_entry,
    });
  }
}

export default new AdminController();
