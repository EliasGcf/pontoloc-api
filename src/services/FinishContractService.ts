import { differenceInCalendarDays } from 'date-fns';
import { getRepository } from 'typeorm';

import AppError from '@errors/AppError';
import Contract from '@models/Contract';

interface Request {
  contract_id: string;
  collect_price: number;
}

class FinishContractService {
  public async execute({ contract_id, collect_price }: Request): Promise<void> {
    const contractsRepository = getRepository(Contract);

    const contract = await contractsRepository.findOne(contract_id);
    if (!contract) {
      throw new AppError('Contract does not exists');
    }

    const timeOffRent = differenceInCalendarDays(
      new Date(),
      contract.created_at,
    );

    const final_price =
      contract.daily_total_price * timeOffRent +
      contract.delivery_price +
      collect_price;

    contract.collect_price = collect_price;
    contract.final_price = final_price;
    contract.collect_at = new Date();

    await contractsRepository.save(contract);
  }
}

export default FinishContractService;
