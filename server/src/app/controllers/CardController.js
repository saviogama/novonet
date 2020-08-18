// import { validate } from 'uuid';

import QrCodeGenerationService from '../services/QrCodeGenerationService';

class CardController {
  async show(request, response) {
    const { id, code } = request.params;

    const client = await Client.findAll({
      where: {
        status: true,
        id,
        code,
      },
    });

    if (!client) {
      return response.status(400).json({ error: 'Client not found' })
    }

    // const validateCode = validate(code);

    // if (!validateCode) {
    //   return response.status(400).json({ error: 'Invalid code' });
    // }

    const valid = await QrCodeGenerationService.run({
      code,
    });

    return response.json({
      id: client.id,
      valid,
    });
  }
}

export default new CardController();
