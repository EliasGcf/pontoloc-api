import Contract from '@modules/contracts/infra/typeorm/entities/Contract';
import ICreateContractDTO from '@modules/contracts/dtos/ICreateContractDTO';
import IFindAllAndCountWithOptionsDTO from '@modules/contracts/dtos/IFindAllAndCountWithOptionsDTO';

interface IResponseFindAllAndCountWithOptions {
  contracts: Contract[];
  count: number;
}

export default interface IContractsRepository {
  findAllAndCountWithOptions(
    data: IFindAllAndCountWithOptionsDTO,
  ): Promise<IResponseFindAllAndCountWithOptions>;
  findByIdWithAllRelations(id: string): Promise<Contract | undefined>;
  findById(id: string): Promise<Contract | undefined>;
  create(data: ICreateContractDTO): Promise<Contract>;
  save(contract: Contract): Promise<Contract>;
}
