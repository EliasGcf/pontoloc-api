import Contract from '@modules/contracts/infra/typeorm/entities/Contract';
import ICreateContractDTO from '@modules/contracts/dtos/ICreateContractDTO';

export default interface IContractsRepository {
  findAllInCreatedDescOrderWithClient(): Promise<Contract[]>;
  findByIdWithAllRelations(id: string): Promise<Contract | undefined>;
  findById(id: string): Promise<Contract | undefined>;
  create(data: ICreateContractDTO): Promise<Contract>;
  save(contract: Contract): Promise<Contract>;
}
