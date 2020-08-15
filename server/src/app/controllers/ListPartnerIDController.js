import Partner from '../models/Partner';

class ListPartnerIDController {
  async index(request, response) {
    const { id } = request.params;

    const partner = await Partner.findByPk(id);

    if (!partner) {
      return response.status(400).json({ error: 'Partner not found' })
    }

    return response.json(partner);
  }
}

export default new ListPartnerIDController();
