import jwt from 'jsonwebtoken';

import authConfig from '../../../config/auth';
import Admin from '../../models/Admin';

class AdminSessionController {
  async store(request, response) {
    const { email, password_entry } = request.body;

    const admin = await Admin.findOne({
      where: {
        email,
      },
    });

    if (!admin) {
      return response.status(401).json({ error: 'Admin not found.' });
    }

    if (!(await admin.checkPassword(password_entry))) {
      return response.status(401).json({ error: 'Password does not match.' });
    }

    const { id } = admin;

    return response.json({
      token: jwt.sign({ id }, authConfig.secret, {
        expiresIn: authConfig.expiresIn,
      }),
    });
  }
}

export default new AdminSessionController();
