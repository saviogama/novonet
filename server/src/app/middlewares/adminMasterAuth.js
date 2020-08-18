import Admin from '../models/Admin';

export default async (request, response, next) => {
  const checkAdminMaster = await Admin.findOne({
    where: {
      id: request.userId,
      admin_master: true,
      admin_type: false,
    },
  });

  if (!checkAdminMaster) {
    return response.status(400).json({
      error: 'Only admin master can access this functionality'
    });
  }

  return next();
};
