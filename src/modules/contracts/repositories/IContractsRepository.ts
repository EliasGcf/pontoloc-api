import Contract from '@modules/contracts/infra/typeorm/entities/Contract';
import ICreateContractDTO from '@modules/contracts/dtos/ICreateContractDTO';
import IFindAllNotFinishedDTO from '@modules/contracts/dtos/IFindAllNotFinishedDTO';

interface IResponseIFindAllNotFinished {
  contracts: Contract[];
  count: number;
}

export default interface IContractsRepository {
  findAllNotFinished(
    data: IFindAllNotFinishedDTO,
  ): Promise<IResponseIFindAllNotFinished>;
  findByIdWithAllRelations(id: string): Promise<Contract | undefined>;
  findById(id: string): Promise<Contract | undefined>;
  create(data: ICreateContractDTO): Promise<Contract>;
  save(contract: Contract): Promise<Contract>;
}
