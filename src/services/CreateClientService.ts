import { getRepository } from 'typeorm';

import Client from '@models/Client';
import AppError from '@errors/AppError';

interface Request {
  name: string;
  cpf: string;
  phone_number: string;
  address: string;
}

class CreateClientService {
  public async execute({
    name,
    cpf,
    phone_number,
    address,
  }: Request): Promise<Client> {
    const clientsRepository = getRepository(Client);

    const clientExists = await clientsRepository.findOne({
      where: { cpf },
      withDeleted: true,
    });

    if (clientExists) {
      throw new AppError('Client already exists');
    }

    const client = clientsRepository.create({
      name,
      cpf,
      phone_number,
      address,
    });

    await clientsRepository.save(client);

    return client;
  }
}

export default CreateClientService;
