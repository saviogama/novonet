import Admin from '../models/Admin';

export default async (request, response, next) => {
  const checkAdmin = await Admin.findOne({
    where: {
      id: request.userId,
      admin_master: false,
      admin_type: true,
    },
  });

  if (!checkAdmin) {
    return response.status(400).json({
      error: 'Only admins can access this functionality'
    });
  }

  return next();
};
