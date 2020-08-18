import Client from '../models/Client';

class ClientController {
  async index(request, response) {
    const clients = await Client.findAll({
      where: {
        client_type: true,
      },
      attributes: ['id', 'email', 'firstname', 'lastname', 'rg', 'cpf', 'code', 'status'],
    });

    return response.json(clients);
  };

  async store(request, response) {
    const clientExists = await Client.findOne({
      where: {
        email: request.body.email,
      }
    });

    if (clientExists) {
      return response.status(400).json({ error: 'Client already exists.' });
    }

    const {
      id,
      email,
      firstname,
      lastname,
      rg,
      cpf,
    } = await Client.create(request.body);

    return response.json({
      id,
      email,
      firstname,
      lastname,
      rg,
      cpf,
    });
  }

  async update(request, response) {
    const { email, code } = request.body;

    const client = await Client.findByPk(request.userId);

    if (email && email !== client.email) {
      const clientExists = await Client.findOne({
        where: {
          email,
        }
      });

      if (clientExists) {
        return response.status(400).json({ error: 'Email already exists.' });
      }
    }

    if (code) {
      return response.status(400).json({ error: 'The code cannot be updated.' });
    }

    const {
      id,
      firstname,
      lastname,
      rg,
      cpf
    } = await client.update(request.body);

    return response.json({
      id,
      email,
      firstname,
      lastname,
      rg,
      cpf
    });
  };
}

export default new ClientController();
