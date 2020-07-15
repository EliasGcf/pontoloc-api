import { Router } from 'express';

import ClientsController from '@modules/clients/infra/http/controllers/ClientsController';
import SoftDeleteController from '@modules/clients/infra/http/controllers/SoftDeleteClientsController';

import validateClientCreate from '@modules/clients/infra/http/validators/ClientCreate';
import validateClientUpdate from '@modules/clients/infra/http/validators/ClientUpdate';
import validateClientList from '@modules/clients/infra/http/validators/ClientList';
import IDParamsMustBeUUID from '@shared/infra/http/validators/IDParamsMustBeUUID';

const clientsRouter = Router();
const clientsController = new ClientsController();
const softDeleteController = new SoftDeleteController();

clientsRouter.use('/:id', IDParamsMustBeUUID);

clientsRouter.post('/', validateClientCreate, clientsController.create);

clientsRouter.get('/', validateClientList, clientsController.index);

// clientsRouter.get('/:id', async (req, res) => {
//   const clientsRepository = getRepository(Client);

//   const client = await clientsRepository.findOne(req.params.id, {
//     relations: [
//       'contracts',
//       'contracts.contract_items',
//       'contracts.contract_items.material',
//     ],
//     select: ['id', 'name', 'cpf', 'phone_number', 'address', 'deleted_at'],
//     withDeleted: true,
//   });

//   if (!client) {
//     throw new AppError('Client does not exists');
//   }

//   return res.json(client);
// });
clientsRouter.get('/:id', clientsController.show);

clientsRouter.put('/:id', validateClientUpdate, clientsController.update);
clientsRouter.delete('/soft/:id', softDeleteController.delete);

export default clientsRouter;
