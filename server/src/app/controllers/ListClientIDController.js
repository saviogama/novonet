import { Op } from 'sequelize';

import Partner from '../models/Partner';
import Client from '../models/Client';

class ListClientIDController {
  async show(request, response) {
    const partner = await Partner.findByPk(request.userId);

    if (!partner) {
      return response
        .status(400)
        .json({ error: 'You do not have access to this functionality' });
    }

    const { firstname, cpf } = request.body;

    const client = await Client.findAll({
      where: {
        firstname: {
          [Op.eq]: firstname,
        },
        cpf: {
          [Op.eq]: cpf,
        },
      },
      attributes: ['id', 'email', 'firstname', 'lastname', 'status'],
    });

    if (!client) {
      return response.status(400).json({ error: 'Client not found.' });
    }

    return response.json(client);
  }
}

export default new ListClientIDController();