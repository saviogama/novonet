import Client from '../models/Client';

class ProfileClientController {
  async show(request, response) {
    const client = await Client.findOne({
      where: {
        id: request.userId,
        client_type: true,
      },
      attributes: ['email', 'firstname', 'lastname', 'rg', 'cpf', 'status'],
    });

    if (!client) {
      return response.status(401).json({ error: 'Error, client not found.' });
    }

    return response.json(client);
  }
}

export default new ProfileClientController();
