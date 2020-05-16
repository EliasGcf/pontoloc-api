import { Router } from 'express';

import ContractsController from '@modules/contracts/infra/http/controllers/ContractsController';

import validateContractCreate from '@modules/contracts/infra/http/validators/ContractCreate';
import validateContractFinish from '@modules/contracts/infra/http/validators/ContractFinish';
import IDParamsMustBeUUID from '@shared/infra/http/validators/IDParamsMustBeUUID';

const contractsRouter = Router();
const contractsController = new ContractsController();

contractsRouter.use('/:id', IDParamsMustBeUUID);

contractsRouter.post('/', validateContractCreate, contractsController.create);

contractsRouter.get('/', contractsController.index);

contractsRouter.get('/:id', contractsController.show);

contractsRouter.put(
  '/:id/finish',
  validateContractFinish,
  contractsController.update,
);

export default contractsRouter;
