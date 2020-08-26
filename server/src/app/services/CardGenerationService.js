import qrcode from 'qr-image';

import Client from '../models/Client';

class CardGenerationService {
  async show(request, response) {
    const client = await Client.findOne({
      where: {
        id: request.userId,
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

    const ImageQrCode = qrcode.image(codeClient, { type: 'png', size: 5 });

    response.type('png');

    ImageQrCode.pipe(response);

    return ImageQrCode;
  }
}

export default new CardGenerationService();
