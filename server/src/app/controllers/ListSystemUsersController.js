import Partner from '../models/Partner';
import Client from '../models/Client';

class ListSystemUsersController {
  async index(request, response) {
    const partners = await Partner.findAndCountAll()
    const clients = await Client.findAndCountAll();

    return response.json({ partners, clients });
  }
}

export default new ListSystemUsersController();
