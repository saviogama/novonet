import qrcode from 'qr-image';

class QrCodeGenerationService {
  async run({ code }) {
    const codeUUID = toString(code);

    const codeClient = qrcode.image(codeUUID, { type: 'svg' });

    return codeClient;
  }
}

export default new QrCodeGenerationService();
