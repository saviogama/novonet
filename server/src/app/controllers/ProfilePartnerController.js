import Partner from '../models/Partner';

class ProfilePartnerController {
  async show(request, response) {
    const partner = await Partner.findOne({
      where: {
        id: request.userId,
        partner_type: true,
      },
      attributes: ['email', 'name', 'company_name', 'rg', 'cpf', 'cnpj'],
    });

    if (!partner) {
      return response.status(401).json({ error: 'Error, partner not found.' });
    }

    return response.json(partner);
  }
}

export default new ProfilePartnerController();
