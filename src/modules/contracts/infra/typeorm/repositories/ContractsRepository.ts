import { getRepository, Repository } from 'typeorm';

import ICreateContractDTO from '@modules/contracts/dtos/ICreateContractDTO';
import IFindAllNotFinishedDTO from '@modules/contracts/dtos/IFindAllNotFinishedDTO';

import IContractsRepository from '@modules/contracts/repositories/IContractsRepository';

import Contract from '@modules/contracts/infra/typeorm/entities/Contract';

interface IResponseIFindAllNotFinished {
  contracts: Contract[];
  count: number;
}

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

  public async findAllNotFinished({
    page,
    name,
  }: IFindAllNotFinishedDTO): Promise<IResponseIFindAllNotFinished> {
    // const [contracts, count] = await this.ormRepository.findAndCount({
    //   relations: ['client'],
    //   order: { number: 'DESC' },
    //   take: 7,
    //   skip: (page - 1) * 7,
    // });

    const query = this.ormRepository
      .createQueryBuilder('contracts')
      .innerJoinAndSelect('contracts.client', 'client')
      .take(7)
      .skip((page - 1) * 7)
      .orderBy('contracts.number', 'DESC');

    if (name) {
      query.where('client.name ILIKE :name', { name: `%${name}%` });
    }

    const [contracts, count] = await query.getManyAndCount();

    return { contracts, count };
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
