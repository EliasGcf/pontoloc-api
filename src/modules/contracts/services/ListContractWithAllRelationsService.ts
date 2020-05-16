import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IContractsRepository from '@modules/contracts/repositories/IContractsRepository';

import Contract from '@modules/contracts/infra/typeorm/entities/Contract';

interface IRequest {
  contract_id: string;
}

@injectable()
class ListContractWithAllRelationsService {
  constructor(
    @inject('ContractsRepository')
    private contractsRepository: IContractsRepository,
  ) {}

  public async execute({ contract_id }: IRequest): Promise<Contract> {
    const contract = await this.contractsRepository.findByIdWithAllRelations(
      contract_id,
    );

    if (!contract) {
      throw new AppError('Contract does not exists.');
    }

    return contract;
  }
}

export default ListContractWithAllRelationsService;
