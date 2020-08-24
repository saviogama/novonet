import Admin from '../../models/Admin';
import Client from '../../models/Client';

class ListClientsStatusController {
  async index(request, response) {
    const adminId = request.userId;

    const adminMaster = await Admin.findOne({
      id: adminId,
      admin_type: true,
    });

    if (!adminMaster) {
      return response
        .status(400)
        .json({ error: 'You do not have access to this functionality!' });
    }

    const clientsAtivos = await Client.count({
      where: {
        status: true,
      },
    });

    const clientsInativos = await Client.count({
      where: {
        status: false,
      },
    });

    return response.json({ clientsAtivos, clientsInativos });
  }
}

export default new ListClientsStatusController();
