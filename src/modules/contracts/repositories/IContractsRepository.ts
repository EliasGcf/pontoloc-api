import Contract from '@modules/contracts/infra/typeorm/entities/Contract';
import ICreateContractDTO from '@modules/contracts/dtos/ICreateContractDTO';
import IFindAllInCraetedDescOrderWithClientAdnPaginationDTO from '@modules/contracts/dtos/IFindAllInCraetedDescOrderWithClientAdnPaginationDTO';

interface IResponseFindAllInCreatedDescOrderWithClientAndPagination {
  contracts: Contract[];
  count: number;
}

export default interface IContractsRepository {
  findAllInCreatedDescOrderWithClientAndPagination(
    data: IFindAllInCraetedDescOrderWithClientAdnPaginationDTO,
  ): Promise<IResponseFindAllInCreatedDescOrderWithClientAndPagination>;
  findByIdWithAllRelations(id: string): Promise<Contract | undefined>;
  findById(id: string): Promise<Contract | undefined>;
  create(data: ICreateContractDTO): Promise<Contract>;
  save(contract: Contract): Promise<Contract>;
}
