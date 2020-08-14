import qrcode from 'qr-image';

import Client from '../models/Client';

class QrCodeGenerationService {
  async run({ id, code }) {
    const client = await Client.findAll({
      where: {
        id,
        code,
      }
    });

    const codeClient = qrcode.image(client.code, { type: 'svg' });

    return codeClient;
  }
}

export default new QrCodeGenerationService();
