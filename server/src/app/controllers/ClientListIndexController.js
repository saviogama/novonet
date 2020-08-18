import Client from '../models/Client';

class ClientListIndexController {
  async show(request, response) {
    const { name, code } = request.body;

    const client = await Client.findAll({
      where: {
        client_type: true,
        id: request.params.userId,
        firstname: name,
        code,
      },
      attributes: ['id', 'email', 'firstname', 'lastname', 'status'],
    });

    if (!client.firstname && !client.code) {
      return response.status(400).json({ error: 'Client not found.' });
    }

    return response.json(client);
  }
}

export default new ClientListIndexController();
