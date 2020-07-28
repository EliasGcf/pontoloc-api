import Contract from '@modules/contracts/infra/typeorm/entities/Contract';
import ICreateContractDTO from '@modules/contracts/dtos/ICreateContractDTO';
import IFilterOptionsDTO from '@modules/contracts/dtos/IFilterOptionsDTO';

interface IFindAllAndCountResponse {
  contracts: Contract[];
  count: number;
}

export default interface IContractsRepository {
  findAllWithFilterOptions(
    data: IFilterOptionsDTO,
  ): Promise<IFindAllAndCountResponse>;
  findByIdWithAllRelations(id: string): Promise<Contract | undefined>;
  findById(id: string): Promise<Contract | undefined>;
  create(data: ICreateContractDTO): Promise<Contract>;
  save(contract: Contract): Promise<Contract>;
}
