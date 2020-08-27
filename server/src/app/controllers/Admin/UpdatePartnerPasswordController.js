import Admin from '../../models/Admin';
import Partner from '../../models/Partner';

class UpdatePartnerPasswordController {
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

    const partner = await Partner.findByPk(partnerID);

    if (!partner) {
      return response.status(400).json({ error: 'Partner not found.' });
    }

    const { password_entry } = await partner.update(request.body);

    return response.json({ password_entry });
  }
}

export default new UpdatePartnerPasswordController();
