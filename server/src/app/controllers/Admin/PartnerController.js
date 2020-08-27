import Admin from '../../models/Admin';
import Partner from '../../models/Partner';

class PartnerController {
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

    const partners = await Partner.findAll({
      where: {
        partner_type: true,
      },
      attributes: ['id', 'email', 'name', 'company_name', 'rg', 'cpf', 'cnpj'],
    });

    return response.json(partners);
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

    const partnerExists = await Partner.findOne({
      where: {
        email: request.body.email,
      },
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
    } = await Partner.create(request.body);

    return response.json({
      id,
      email,
      name,
      company_name,
      rg,
      cpf,
      cnpj,
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

    const partnerID = request.params.id;
    const { email } = request.body;

    const partner = await Partner.findByPk(partnerID);

    if (!partner) {
      return response.status(400).json({ error: 'Partner not found.' });
    }

    if (email && email !== partner.email) {
      const PartnerExists = await Partner.findOne({
        where: {
          email,
        },
      });

      if (PartnerExists) {
        return response.status(400).json({ error: 'Email already exists.' });
      }
    }

    const { name, company_name, rg, cpf, cnpj } = await partner.update(
      request.body
    );

    return response.json({
      email,
      name,
      company_name,
      rg,
      cpf,
      cnpj,
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

    const partnerID = request.params.id;

    const partner = await Partner.findByPk(partnerID);

    if (!partner) {
      return response.status(400).json({ error: 'Partner not found.' });
    }

    await partner.destroy();

    return response.json(partner);
  }
}

export default new PartnerController();
