import jwt from 'jsonwebtoken';

import authConfig from '../../config/auth';
import Partner from '../models/Partner';

class PartnerSessionController {
  async store(request, response) {
    const { email, password_entry } = request.body;

    const partner = await Partner.findOne({
      where: {
        email,
      },
    });

    if (!partner) {
      return response.status(401).json({ error: 'E-mail not found.' });
    }

    if (!(await partner.checkPassword(password_entry))) {
      return response.status(401).json({ error: 'Password does not match.' });
    }

    const { id, partner_type } = partner;

    return response.json({
      token: jwt.sign({ id, partner_type }, authConfig.secret, {
        expiresIn: authConfig.expiresIn,
      }),
    });
  }
}

export default new PartnerSessionController();
