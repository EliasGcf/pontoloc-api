import { injectable, inject } from 'tsyringe';

import IClientsRepository from '@modules/clients/repositories/IClientsRepository';
import Client from '@modules/clients/infra/typeorm/entities/Client';

interface IRequest {
  deleted: boolean;
}

@injectable()
class ListClientsService {
  constructor(
    @inject('ClientsRepository')
    private clientsRepository: IClientsRepository,
  ) {}

  public async execute({ deleted }: IRequest): Promise<Client[]> {
    const clients = await this.clientsRepository.findAll({ deleted });

    return clients;
  }
}

export default ListClientsService;
