import QRCode from 'qrcode';

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

    const opts = {
      type: 'image/png',
    };

    const generateQR = QRCode.toDataURL(codeClient, opts, (err, url) => {
      if (err) {
        throw new Error('Error!');
      }

      return url;
    });

    console.log(typeof generateQR);
    console.log(generateQR);

    // const generateQR = async (code) => {
    //   try {
    //     console.log(await QRCode.toDataURL(code));
    //   } catch (err) {
    //     console.error(err);
    //   }
    // };

    // const ImageQrCode = qrcode.image(codeClient, {
    //   type: 'png',
    //   parse_url: true,
    //   size: 5,
    // });

    // response.type('png');

    // ImageQrCode.pipe(response);

    return response.json(generateQR);
  }
}

export default new CardGenerationService();
