import { injectable, inject } from 'tsyringe';
import { differenceInCalendarDays } from 'date-fns';

import IContractsRepository from '@modules/contracts/repositories/IContractsRepository';

import AppError from '@shared/errors/AppError';
import Contract from '@modules/contracts/infra/typeorm/entities/Contract';

interface IRequest {
  contract_id: string;
  collect_price: number;
}

@injectable()
class FinishContractService {
  constructor(
    @inject('ContractsRepository')
    private contractsRepository: IContractsRepository,
  ) {}

  public async execute({
    contract_id,
    collect_price = 0,
  }: IRequest): Promise<Contract> {
    const contract = await this.contractsRepository.findById(contract_id);

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

    Object.assign(contract, {
      collect_price,
      final_price,
      collect_at: new Date(),
    });

    await this.contractsRepository.save(contract);

    return contract;
  }
}

export default FinishContractService;
