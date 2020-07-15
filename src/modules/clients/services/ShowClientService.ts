import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IClientsRepository from '@modules/clients/repositories/IClientsRepository';
import Client from '@modules/clients/infra/typeorm/entities/Client';

interface IRequest {
  id: string;
}

@injectable()
class ShowClientService {
  constructor(
    @inject('ClientsRepository')
    private clientsRepository: IClientsRepository,
  ) {}

  public async execute({ id }: IRequest): Promise<Client | undefined> {
    const client = await this.clientsRepository.findById(id);

    if (!client) {
      throw new AppError('Client not found');
    }

    return client;
  }
}

export default ShowClientService;
