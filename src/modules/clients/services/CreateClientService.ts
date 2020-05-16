import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IClientsRepository from '@modules/clients/repositories/IClientsRepository';
import Client from '@modules/clients/infra/typeorm/entities/Client';

interface IRequest {
  name: string;
  cpf: string;
  phone_number: string;
  address: string;
}

@injectable()
class CreateClientService {
  constructor(
    @inject('ClientsRepository')
    private clientsRepository: IClientsRepository,
  ) {}

  public async execute({
    name,
    cpf,
    phone_number,
    address,
  }: IRequest): Promise<Client> {
    const clientExists = await this.clientsRepository.findByCPFWithDeleted(cpf);

    if (clientExists) {
      throw new AppError('Client already exists');
    }

    const client = await this.clientsRepository.create({
      name,
      cpf,
      phone_number,
      address,
    });

    return client;
  }
}

export default CreateClientService;
