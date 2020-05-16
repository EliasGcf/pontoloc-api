import { injectable, inject } from 'tsyringe';

import IClientsRepository from '@modules/clients/repositories/IClientsRepository';

import AppError from '@shared/errors/AppError';

interface IRequest {
  name: string;
  cpf: string;
  phone_number: string;
  address: string;
  client_id: string;
}

@injectable()
class UpdateClientService {
  constructor(
    @inject('ClientsRepository')
    private clientsRepository: IClientsRepository,
  ) {}

  public async execute({
    name,
    cpf,
    phone_number,
    address,
    client_id,
  }: IRequest): Promise<void> {
    const client = await this.clientsRepository.findById(client_id);

    if (!client) {
      throw new AppError('Client does not exists');
    }

    const clientWithSameCPF = await this.clientsRepository.findByCPFWithDeleted(
      cpf,
      { execept_client_id: client_id },
    );

    if (clientWithSameCPF) {
      throw new AppError('Client already exists');
    }

    Object.assign(client, { name, cpf, phone_number, address });

    await this.clientsRepository.save(client);
  }
}

export default UpdateClientService;
