// import { validate } from 'uuid';

import QrCodeGenerationService from '../services/QrCodeGenerationService';

class CardController {
  async index(request, response) {
    const { code } = request.body;

    const { id } = request.params;

    const client = await Client.findByPk(id);

    if (!client) {
      return response.status(400).json({ error: 'Client not found' })
    }

    // const validateCode = validate(code);

    if (!code) {
      return response.status(400).json({ error: 'Code not found or does not exist' });
    }

    // if (!validateCode) {
    //   return response.status(400).json({ error: 'Invalid code' });
    // }

    const valid = await QrCodeGenerationService.run({
      code,
    });

    return response.json(valid);
  }
}

export default new CardController();
