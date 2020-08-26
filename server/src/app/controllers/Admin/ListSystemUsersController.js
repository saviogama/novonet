import Admin from '../../models/Admin';
import Partner from '../../models/Partner';
import Client from '../../models/Client';

class ListSystemUsersController {
  async index(request, response) {
    const admin = await Admin.findOne({
      where: {
        id: request.userId,
        admin_type: true,
      },
    });

    if (!admin) {
      return response
        .status(400)
        .json({ error: 'You do not have access to this functionality!' });
    }

    const partners = await Partner.count();
    const clients = await Client.count();

    return response.json({ partners, clients });
  }
}

export default new ListSystemUsersController();
