import { getRepository, Not } from 'typeorm';

import Client from '@models/Client';
import AppError from '@errors/AppError';

interface Request {
  name: string;
  cpf: string;
  phone_number: string;
  address: string;
  client: Client;
}

class UpdateClientService {
  public async execute({
    name,
    cpf,
    phone_number,
    address,
    client,
  }: Request): Promise<void> {
    const clientsRepository = getRepository(Client);

    const clientWithAnotherCPF = await clientsRepository.findOne({
      cpf: Not(client.cpf),
    });

    if (clientWithAnotherCPF) {
      throw new AppError('Client already exists');
    }

    client.name = name;
    client.cpf = cpf;
    client.phone_number = phone_number;
    client.address = address;

    await clientsRepository.save(client);
  }
}

export default UpdateClientService;
