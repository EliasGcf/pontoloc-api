import { EntityRepository, Repository } from 'typeorm';

import Contract from '@models/Contract';

interface CreateContract {
  client_id: string;

  daily_total_price: number;

  delivery_price?: number;
}

@EntityRepository(Contract)
class ContractRepository extends Repository<Contract> {
  public async CreateAndSave({
    client_id,
    daily_total_price,
    delivery_price,
  }: CreateContract): Promise<Contract> {
    const contract = this.create({
      client_id,
      daily_total_price,
      delivery_price,
    });

    const contractCreated = await this.save(contract);

    return contractCreated;
  }
}

export default ContractRepository;
