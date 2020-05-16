import { injectable, inject } from 'tsyringe';

import IContractsRepository from '@modules/contracts/repositories/IContractsRepository';

import Contract from '@modules/contracts/infra/typeorm/entities/Contract';

// interface IRequest {}

@injectable()
class ListContractsByDescOrderCreatedWithClientService {
  constructor(
    @inject('ContractsRepository')
    private contractsRepository: IContractsRepository,
  ) {}

  public async execute(): Promise<Contract[]> {
    const contracts = await this.contractsRepository.findAllInCreatedDescOrderWithClient();

    return contracts;
  }
}

export default ListContractsByDescOrderCreatedWithClientService;
