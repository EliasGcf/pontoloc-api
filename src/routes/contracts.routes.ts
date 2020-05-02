import { getRepository } from 'typeorm';
import { Router } from 'express';

import validateContractCreate from '@validators/ContractCreate';
import validateContractFinish from '@validators/ContractFinish';
import validateMustBeUUID from '@validators/MustBeUUID';

import AppError from '@errors/AppError';
import Contract from '@models/Contract';

import CreateContractService from '@services/CreateContractService';
import FinishContractService from '@services/FinishContractService';

const contractsRouter = Router();

contractsRouter.use('/:id', validateMustBeUUID);

contractsRouter.post('/', validateContractCreate, async (req, res) => {
  const { client_id, materials, delivery_price = 0 } = req.body;

  const createContract = new CreateContractService();

  const { id, daily_total_price } = await createContract.execute({
    client_id,
    delivery_price,
    materials,
  });

  return res.status(201).json({ id, daily_total_price });
});

contractsRouter.get('/', async (req, res) => {
  const contractsRepository = getRepository(Contract);

  const contracts = await contractsRepository.find({
    order: { created_at: 'DESC' },
    select: [
      'id',
      'client_id',
      'daily_total_price',
      'delivery_price',
      'collect_price',
      'final_price',
      'collect_at',
      'created_at',
    ],
  });

  return res.json(contracts);
});

contractsRouter.get('/:id', async (req, res) => {
  const contractsRepository = getRepository(Contract);

  const contract = await contractsRepository.findOne(req.params.id, {
    relations: ['client', 'contract_items', 'contract_items.material'],
    select: [
      'id',
      'client_id',
      'daily_total_price',
      'delivery_price',
      'collect_price',
      'final_price',
      'collect_at',
    ],
  });
  if (!contract) {
    throw new AppError('Contract does not exists');
  }

  return res.json(contract);
});

contractsRouter.put('/:id/finish', validateContractFinish, async (req, res) => {
  const { collect_price = 0 } = req.body;

  const finishContract = new FinishContractService();

  await finishContract.execute({
    contract_id: req.params.id,
    collect_price,
  });

  return res.status(204).end();
});

export default contractsRouter;
