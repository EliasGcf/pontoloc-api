import { injectable, inject } from 'tsyringe';

import IContractsRepository from '@modules/contracts/repositories/IContractsRepository';

import Contract from '@modules/contracts/infra/typeorm/entities/Contract';

interface IRequest {
  page: number;
  name: string;
  finished: boolean;
}

interface IResponse {
  contracts: Contract[];
  count: number;
}

@injectable()
class ListAllContractWithFilterOptionsService {
  constructor(
    @inject('ContractsRepository')
    private contractsRepository: IContractsRepository,
  ) {}

  public async execute({ page, name, finished }: IRequest): Promise<IResponse> {
    const {
      contracts,
      count,
    } = await this.contractsRepository.findAllWithFilterOptions({
      page,
      name,
      finished,
    });

    return { contracts, count };
  }
}

export default ListAllContractWithFilterOptionsService;
