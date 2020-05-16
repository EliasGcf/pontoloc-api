import { getRepository, Repository, Not } from 'typeorm';

import IClientsRepository from '@modules/clients/repositories/IClientsRepository';
import ICreateClientDTO from '@modules/clients/dtos/ICreateClientDTO';
import IFindByCPFWithDeletedDTO from '@modules/clients/dtos/IFindByCPFWithDeletedDTO';
import IFindAllDTO from '@modules/clients/dtos/IFindAllDTO';

import Client from '@modules/clients/infra/typeorm/entities/Client';

export default class ClientsRepository implements IClientsRepository {
  private ormRepository: Repository<Client>;

  constructor() {
    this.ormRepository = getRepository(Client);
  }

  public async create({
    name,
    cpf,
    phone_number,
    address,
  }: ICreateClientDTO): Promise<Client> {
    const client = this.ormRepository.create({
      name,
      cpf,
      phone_number,
      address,
    });

    await this.ormRepository.save(client);

    return client;
  }

  public async save(client: Client): Promise<Client> {
    return this.ormRepository.save(client);
  }

  public async findByCPFWithDeleted(
    cpf: string,
    { execept_client_id }: IFindByCPFWithDeletedDTO,
  ): Promise<Client | undefined> {
    let client: Client | undefined;

    if (execept_client_id) {
      client = await this.ormRepository.findOne({
        where: { cpf, id: Not(execept_client_id) },
        withDeleted: true,
      });
    } else {
      client = await this.ormRepository.findOne({
        where: { cpf },
        withDeleted: true,
      });
    }

    return client;
  }

  public async findById(id: string): Promise<Client | undefined> {
    const cliente = await this.ormRepository.findOne(id);

    return cliente;
  }

  public async findAll({ deleted }: IFindAllDTO): Promise<Client[]> {
    const clients = await this.ormRepository.find({ withDeleted: deleted });

    return clients;
  }

  public async softDeleteById(id: string): Promise<void> {
    await this.ormRepository.softDelete(id);
  }
}
