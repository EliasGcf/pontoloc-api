import { getRepository } from 'typeorm';

import { Router } from 'express';

import Contract from '@models/Contract';

import CreateContractService from '@services/CreateContractService';

const contractsRouter = Router();

contractsRouter.post('/', async (req, res) => {
  const { client_id, materials } = req.body;

  const createContract = new CreateContractService();

  const { id, daily_total_price } = await createContract.execute({
    client_id,
    materials,
  });

  return res.status(201).json({ id, daily_total_price });
});

contractsRouter.get('/', async (req, res) => {
  const contractsRepository = getRepository(Contract);

  const contracts = await contractsRepository.find({
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

  return res.json(contracts);
});

export default contractsRouter;
