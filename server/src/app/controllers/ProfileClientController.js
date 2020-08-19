import Client from '../models/Client';

class ProfileClientController {
  async show(request, response) {
    const client = await Client.findOne({
      where: {
        id: request.userId,
        client_type: true,
      }
    });

    if (!client) {
      return response.status(401).json({ error: 'Error, client not found.' });
    }

    const {
      id,
      firstname,
      lastname,
      rg,
      cpf,
      client_type,
      status
    } = client;

    return response.json({
      client: {
        id,
        firstname,
        lastname,
        rg,
        cpf,
        client_type,
        status
      },
    });
  };
};

export default new ProfileClientController();
