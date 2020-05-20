import { injectable, inject } from 'tsyringe';

import IContractsRepository from '@modules/contracts/repositories/IContractsRepository';

import Contract from '@modules/contracts/infra/typeorm/entities/Contract';

interface IRequest {
  page: number;
}

interface IResponse {
  contracts: Contract[];
  count: number;
}

@injectable()
class ListContractsByCreatedDescOrderWithClientAndPaginationService {
  constructor(
    @inject('ContractsRepository')
    private contractsRepository: IContractsRepository,
  ) {}

  public async execute({ page }: IRequest): Promise<IResponse> {
    const {
      contracts,
      count,
    } = await this.contractsRepository.findAllInCreatedDescOrderWithClientAndPagination(
      { page },
    );

    return { contracts, count };
  }
}

export default ListContractsByCreatedDescOrderWithClientAndPaginationService;
