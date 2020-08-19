import Partner from '../models/Partner';

class PartnerListIDController {
  async show(request, response) {
    const { name, company_name, cnpj } = request.body;

    const partner = await Partner.findOne({
      where: {
        name,
        company_name,
        cnpj,
      },
      attributes: ['id', 'email', 'name', 'company_name', 'rg', 'cpf', 'cnpj'],
    });

    if (!partner.name || !partner.company_name || !partner.cnpj) {
      return response.status(400).json({ error: 'Partner not found.' });
    }

    return response.json(partner);
  }
}

export default new PartnerListIDController();
