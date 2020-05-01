import { getRepository, Not } from 'typeorm';

import Client from '@models/Client';
import AppError from '@errors/AppError';

interface Request {
  name: string;
  cpf: string;
  phone_number: string;
  address: string;
  client_id: string;
}

class UpdateClientService {
  public async execute({
    name,
    cpf,
    phone_number,
    address,
    client_id,
  }: Request): Promise<void> {
    const clientsRepository = getRepository(Client);

    const clientWithSameCPF = await clientsRepository.findOne({
      where: { id: Not(client_id), cpf },
      withDeleted: true,
    });

    if (clientWithSameCPF) {
      throw new AppError('Client already exists');
    }

    await clientsRepository.update(client_id, {
      name,
      cpf,
      phone_number,
      address,
    });
  }
}

export default UpdateClientService;
