import jwt from 'jsonwebtoken';

import authConfig from '../../config/auth';
import Client from '../models/Client';

class ClientSessionController {
  async store(request, response) {
    const { code } = request.body;

    const client = await Client.findOne({
      where: {
        code,
      },
    });

    if (!client) {
      return response.status(401).json({ error: 'CPF does not match.' });
    }

    const { id, client_type } = client;

    return response.json({
      token: jwt.sign({ id, client_type }, authConfig.secret, {
        expiresIn: authConfig.expiresIn,
      }),
    });
  }
}

export default new ClientSessionController();
