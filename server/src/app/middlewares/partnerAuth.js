import Partner from '../models/Partner';

export default async (request, response, next) => {
  const checkPartner = await Partner.findOne({
    where: {
      partner_type: true,
    },
  });

  if (!checkPartner) {
    return response.status(400).json({
      error: 'You do not have access to this functionality'
    });
  }

  return next();
};
