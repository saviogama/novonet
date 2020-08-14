import QrCodeGenerationService from '../services/QrCodeGenerationService';

class CardController {
  async index(request, response) {
    const { code } = request.body;

    if (!code) {
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
