import Partner from '../models/Partner';

class ProfilePartnerController {
  async show(request, response) {
    const partner = await Partner.findOne({
      where: {
        id: request.userId,
        partner_type: true,
      }
    });

    if (!partner) {
      return response.status(401).json({ error: 'Error, partner not found.' });
    }

    const {
      id,
      name,
      company_name,
      rg,
      cpf,
      cnpj,
    } = partner;

    return response.json({
      partner: {
        id,
        email,
        name,
        company_name,
        rg,
        cpf,
        cnpj,
      },
    });
  };
};

export default new ProfilePartnerController();
