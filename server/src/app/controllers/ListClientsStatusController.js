import Client from '../models/Client';

class ListClientsStatusController {
  async index(request, response) {
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
