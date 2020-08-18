import qrcode from 'qr-image';

import Client from '../models/Client';

class CardController {
  async show(request, response) {
    const { id } = request.params;

    const client = await Client.findAll({
      where: {
        id,
        status: true,
      },
      raw: true,
      attributes: ['code'],
    });

    if (!client) {
      return response.status(400).json({ error: 'Erro, data invalid' });
    }

    const jsonToString = JSON.stringify(client);

    const codeClient = jsonToString.slice(10, jsonToString.length - 3);

    const ImageQrCode = qrcode.image(codeClient, { type: 'svg', size: 5 });

    response.type('svg');

    ImageQrCode.pipe(response);

    return ImageQrCode;
  }
}

export default new CardController();
