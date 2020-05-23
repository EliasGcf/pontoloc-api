import { injectable, inject } from 'tsyringe';

import IContractsRepository from '@modules/contracts/repositories/IContractsRepository';

import Contract from '@modules/contracts/infra/typeorm/entities/Contract';

interface IRequest {
  page: number;
  name: string;
}

interface IResponse {
  contracts: Contract[];
  count: number;
}

@injectable()
class ListAllContractNotFinishedService {
  constructor(
    @inject('ContractsRepository')
    private contractsRepository: IContractsRepository,
  ) {}

  public async execute({ page, name }: IRequest): Promise<IResponse> {
    const {
      contracts,
      count,
    } = await this.contractsRepository.findAllNotFinished({
      page,
      name,
    });

    return { contracts, count };
  }
}

export default ListAllContractNotFinishedService;
