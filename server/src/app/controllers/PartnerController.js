import Partner from '../models/Partner';

class PartnerController {
  async store(request, response) {
    const partnerExists = await Partner.findOne({
      where: {
        email: request.body.email,
      }
    });

    if (partnerExists) {
      return response.status(400).json({ error: 'Partner already exists.' });
    }

    const {
      id,
      email,
      name,
      company_name,
      rg,
      cpf,
      cnpj,
      partner_type
    } = await Partner.create(request.body);

    return response.json({
      id,
      email,
      name,
      company_name,
      rg,
      cpf,
      cnpj,
      partner_type
    });
  };

  async update(request, response) {
    const { email, old_password } = request.body;

    const partner = await Partner.findByPk(request.userId);

    if (email && email !== partner.email) {
      const partnerExists = await Partner.findOne({
        where: {
          email,
        }
      });

      if (partnerExists) {
        return response.status(400).json({ error: 'Partner already exists.' });
      }
    }

    if (old_password && !(await partner.checkPassword(old_password))) {
      return response.status(401).json({ error: 'Password does not match.' });
    }

    const {
      id,
      name,
      company_name,
      rg,
      cpf,
      cnpj
    } = await partner.update(request.body);

    return response.json({
      id,
      email,
      name,
      company_name,
      rg,
      cpf,
      cnpj
    });
  };

  async index(request, response) {
    const partners = await Partner.findAll({
      where: {
        partner_type: true,
      },
      attributes: ['id', 'email', 'name', 'company_name', 'rg', 'cpf', 'cnpj'],
    });

    return response.json(partners);
  };
};

export default new PartnerController();
