import { validate } from 'uuid';

import QrCodeGenerationService from '../services/QrCodeGenerationService';

class CardController {
  async index(request, response) {
    const { code } = request.body;

    const validateCode = validate(code);

    if (!code) {
      return response.status(400).json({ error: 'Code not found/exist' });
    }

    if (!validateCode) {
      return response.status(400).json({ error: 'Invalid code' });
    }

    const valid = await QrCodeGenerationService.run({
      id: request.params.id,
      code,
    });

    return response.json(valid);
  }
}

export default new CardController();
