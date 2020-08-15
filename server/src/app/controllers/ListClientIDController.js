import Client from '../models/Client';

class ListClientIDController {
  async index(request, response) {
    const { id } = request.params;

    const client = await Client.findByPk(id);

    if (!client) {
      return response.status(400).json({ error: 'Client not found' })
    }

    return response.json(client);
  }
}

export default new ListClientIDController();
