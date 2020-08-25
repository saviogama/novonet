import jwt from 'jsonwebtoken';

import authConfig from '../../config/auth';
import Client from '../models/Client';

class ClientSessionController {
  async store(request, response) {
    const { cpf } = request.body;

    const client = await Client.findOne({
      where: {
        cpf,
      },
    });

    if (!client) {
      return response.status(401).json({ error: 'CPF does not match.' });
    }

    const { id } = client;

    return response.json({
      token: jwt.sign({ id }, authConfig.secret, {
        expiresIn: authConfig.expiresIn,
      }),
    });
  }
}

export default new ClientSessionController();
