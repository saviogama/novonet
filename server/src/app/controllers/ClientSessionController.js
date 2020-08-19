import jwt from 'jsonwebtoken';

import authConfig from '../../config/auth';
import Client from '../models/Client';

class ClientSessionController {
  async store(request, response) {
    const { code } = request.body;

    const client = await Client.findOne({
      where: {
        code,
      }
    });

    if (!client) {
      return response.status(401).json({ error: 'Code does not match.' });
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
