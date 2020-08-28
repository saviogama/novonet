import Admin from '../../models/Admin';
import Client from '../../models/Client';

class ClientController {
  async index(request, response) {
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

    const clients = await Client.findAll({
      where: {
        client_type: true,
      },
      attributes: [
        'id',
        'email',
        'firstname',
        'lastname',
        'rg',
        'cpf',
        'code',
        'status',
      ],
    });

    return response.json(clients);
  }

  async store(request, response) {
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

    const clientExists = await Client.findOne({
      where: {
        email: request.body.email,
      },
    });

    if (clientExists) {
      return response.status(400).json({ error: 'Client already exists.' });
    }

    const { id, email, firstname, lastname, rg, cpf } = await Client.create(
      request.body
    );

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
    const { email } = request.body;

    const client = await Client.findByPk(clientID);

    if (!client) {
      return response.status(400).json({ error: 'Client not found.' });
    }

    if (email && email !== client.email) {
      const clientExists = await Client.findOne({
        where: {
          email,
        },
      });

      if (clientExists) {
        return response.status(400).json({ error: 'Email already exists.' });
      }
    }

    const { fisrtname, lastname, rg, cpf, status } = await client.update(
      request.body
    );

    return response.json({
      email,
      fisrtname,
      lastname,
      rg,
      cpf,
      status,
    });
  }

  async delete(request, response) {
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

    await client.destroy();

    return response.json(client);
  }
}

export default new ClientController();
