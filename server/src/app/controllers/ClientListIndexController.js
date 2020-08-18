import Client from '../models/Client';

class ClientListIndexController {
  async show(request, response) {
    const { firstname, code } = request.body;

    const client = await Client.findOne({
      where: {
        firstname,
        code,
      },
      attributes: ['id', 'email', 'firstname', 'lastname', 'status'],
    });

    if (!client.firstname || !client.code) {
      return response.status(400).json({ error: 'Client not found.' });
    }

    return response.json(client);
  }
}

export default new ClientListIndexController();
