import csvParse from 'csv-parse';
import fs from 'fs';

import Client from '../models/Client';

class ImportFileService {
  async run(filePath) {
    const contactsReadStream = fs.createReadStream(filePath);

    const parsers = csvParse({
      from_line: 2,
      // delimiter: ';',
    });

    const parseCSV = contactsReadStream.pipe(parsers);

    const datasClients = [];

    parseCSV.on('data', async (line) => {
      const [
        email,
        firstname,
        lastname,
        code,
        rg,
        cpf,
        status,
      ] = line.map((cell) => cell.trim());

      if (!email || !firstname || !lastname || !code || !rg || !cpf || !status)
        return;

      datasClients.push({
        email,
        firstname,
        lastname,
        code,
        rg,
        cpf,
        status,
      });
    });

    await new Promise((resolve) => parseCSV.on('end', resolve));

    const createdClients = Client.create(
      datasClients.map((data) => ({
        email: data.email,
        firstname: data.firstname,
        lastname: data.lastname,
        code: data.code,
        rg: data.rg,
        cpf: data.cpf,
        status: data.status,
      }))
    );

    console.log(createdClients);

    // await Client.(createdClients);

    // await fs.promises.unlink(filePath);

    return createdClients;
  }
}

export default new ImportFileService();
