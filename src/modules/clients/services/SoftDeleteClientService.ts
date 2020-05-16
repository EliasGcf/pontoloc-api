import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IClientsRepository from '@modules/clients/repositories/IClientsRepository';

interface IRequest {
  id: string;
}

@injectable()
class SoftDeleteClientService {
  constructor(
    @inject('ClientsRepository')
    private clientsRepository: IClientsRepository,
  ) {}

  public async execute({ id }: IRequest): Promise<void> {
    const client = await this.clientsRepository.findById(id);

    if (!client) {
      throw new AppError('Client does not exists');
    }

    await this.clientsRepository.softDeleteById(id);
  }
}

export default SoftDeleteClientService;
