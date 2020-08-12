import Client from '../models/Client';

class ClientController {
  async store(request, response) {
    const clientExists = await Client.findOne({
      where: {
        email: request.body.email,
        code: request.body.code,
      }
    });

    if (clientExists) {
      return response.status(400).json({ error: 'Partner already exists.' });
    }

    const {
      id,
      email,
      firstname,
      lastname,
      rg,
      cpf,
      client_type,
      status
    } = await Client.create(request.body);

    return response.json({
      id,
      email,
      firstname,
      lastname,
      rg,
      cpf,
      client_type,
      status
    });
  }

  async index(request, response) {
    const clients = await Client.findAll({
      // where: {
      //   client: true,
      // },
      attributes: ['id', 'email', 'firstname', 'lastname', 'rg', 'cpf', 'status'],
    });

    return response.json(clients);
  };

  async update(request, response) {
    const { email } = request.body;

    const client = await Client.findByPk(request.userId);

    if (email && email !== partner.email) {
      const clientExists = await Client.findOne({
        where: {
          email,
        }
      });

      if (clientExists) {
        return response.status(400).json({ error: 'Partner already exists.' });
      }
    }

    const {
      id,
      email,
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
