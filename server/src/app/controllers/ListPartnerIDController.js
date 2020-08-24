import { Op } from 'sequelize';

import Admin from '../models/Admin';
import Partner from '../models/Partner';

class ListPartnerIDController {
  async show(request, response) {
    const admin = await Admin.findByPk(request.userId);

    if (!admin) {
      return response
        .status(400)
        .json({ error: 'You do not have access to this functionality!' });
    }

    const { name, company_name, cnpj } = request.body;

    const partner = await Partner.findAll({
      where: {
        [Op.or]: [name, company_name, cnpj],
      },
      attributes: ['email', 'name', 'company_name', 'rg', 'cpf', 'cnpj'],
    });

    if (!partner) {
      return response.status(400).json({ error: 'Partner not found.' });
    }

    return response.json(partner);
  }
}

export default new ListPartnerIDController();
