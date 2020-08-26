import Admin from '../../models/Admin';

import ImportFileService from '../../services/ImportFileService';

class FileController {
  async store(request, response) {
    const admin = await Admin.findOne({
      where: {
        id: request.userId,
        admin_type: true,
      },
    });

    if (!admin) {
      return response
        .status(400)
        .json({ error: 'You do not have access to this functionality!' });
    }

    const uploadData = await ImportFileService.run(request.file.path);

    return response.json(uploadData);
  }
}

export default new FileController();
