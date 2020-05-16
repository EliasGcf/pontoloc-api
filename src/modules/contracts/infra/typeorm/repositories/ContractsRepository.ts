import { getRepository, Repository } from 'typeorm';

import ICreateContractDTO from '@modules/contracts/dtos/ICreateContractDTO';

import IContractsRepository from '@modules/contracts/repositories/IContractsRepository';

import Contract from '@modules/contracts/infra/typeorm/entities/Contract';

export default class ContarctsRepository implements IContractsRepository {
  private ormRepository: Repository<Contract>;

  constructor() {
    this.ormRepository = getRepository(Contract);
  }

  public async create({
    client,
    materials,
    delivery_price,
    daily_total_price,
  }: ICreateContractDTO): Promise<Contract> {
    const contract = this.ormRepository.create({
      client,
      contract_items: materials,
      delivery_price,
      daily_total_price,
    });

    await this.ormRepository.save(contract);

    return contract;
  }

  public async save(contract: Contract): Promise<Contract> {
    return this.ormRepository.save(contract);
  }

  public async findById(id: string): Promise<Contract | undefined> {
    const contract = await this.ormRepository.findOne(id);

    return contract;
  }

  public async findAllInCreatedDescOrderWithClient(): Promise<Contract[]> {
    const contracts = await this.ormRepository.find({
      relations: ['client'],
      order: { created_at: 'DESC' },
    });

    return contracts;
  }

  public async findByIdWithAllRelations(
    id: string,
  ): Promise<Contract | undefined> {
    const contract = await this.ormRepository.findOne(id, {
      relations: ['client', 'contract_items', 'contract_items.material'],
    });

    return contract;
  }
}
