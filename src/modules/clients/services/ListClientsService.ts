import { injectable, inject } from 'tsyringe';

import IClientsRepository from '@modules/clients/repositories/IClientsRepository';
import Client from '@modules/clients/infra/typeorm/entities/Client';

interface IRequest {
  deleted: boolean;
  page: number;
  name: string;
}

interface IResponse {
  clients: Client[];
  count: number;
}

@injectable()
class ListClientsService {
  constructor(
    @inject('ClientsRepository')
    private clientsRepository: IClientsRepository,
  ) {}

  public async execute({ deleted, name, page }: IRequest): Promise<IResponse> {
    const {
      clients,
      count,
    } = await this.clientsRepository.findAllWithPaginationAndSearch({
      deleted,
      page,
      name,
    });

    return { clients, count };
  }
}

export default ListClientsService;
