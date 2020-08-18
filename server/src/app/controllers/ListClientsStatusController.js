import Client from '../models/Client';

class ListClientsStatusController {
  async index(request, response) {
    // let statusAtivo = 0;
    // let statusInativo = 0;

    const clientsAtivos = await Client.findAndCountAll({
      where: {
        status: true,
      },
    });

    const clientsInativos = await Client.findAndCountAll({
      where: {
        status: false,
      },
    });

    // const ativos = clientsAtivos.forEach(ativo => {
    //   statusAtivo = statusAtivo + 1;

    //   return statusAtivo;
    // });

    // const inativos = clientsInativos.forEach(inativo => {
    //   statusInativo = statusInativo + 1;

    //   return statusInativo;
    // });

    return response.json({ clientsAtivos, clientsInativos });
  }
}

export default new ListClientsStatusController();
