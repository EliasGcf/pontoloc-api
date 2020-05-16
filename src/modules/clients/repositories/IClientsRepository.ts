import Client from '@modules/clients/infra/typeorm/entities/Client';
import ICreateClientDTO from '@modules/clients/dtos/ICreateClientDTO';
import IFindByCPFWithDeletedDTO from '@modules/clients/dtos/IFindByCPFWithDeletedDTO';
import IFindAllDTO from '@modules/clients/dtos/IFindAllDTO';

export default interface IClientsRepository {
  findAll(options: IFindAllDTO): Promise<Client[]>;
  findById(id: string): Promise<Client | undefined>;
  findByCPFWithDeleted(
    cpf: string,
    options?: IFindByCPFWithDeletedDTO,
  ): Promise<Client | undefined>;
  create(data: ICreateClientDTO): Promise<Client>;
  softDeleteById(id: string): Promise<void>;
  save(client: Client): Promise<Client>;
}
