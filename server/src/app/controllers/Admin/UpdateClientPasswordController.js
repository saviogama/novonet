import Admin from '../../models/Admin';
import Client from '../../models/Client';

class UpdateClientPasswordController {
  async update(request, response) {
    const adminId = request.userId;

    const admin = await Admin.findOne({
      where: {
        id: adminId,
        admin_type: true,
      },
    });

    if (!admin) {
      return response
        .status(400)
        .json({ error: 'You do not have access to this functionality!' });
    }

    const clientID = request.params.id;

    const client = await Client.findByPk(clientID);

    if (!client) {
      return response.status(400).json({ error: 'Client not found.' });
    }

    const { password_entry } = await client.update(request.body);

    return response.json({ password_entry });
  }
}

export default new UpdateClientPasswordController();
