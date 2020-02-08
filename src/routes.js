import { Router } from 'express';

import ClientController from './app/controllers/ClientController';
import ContractController from './app/controllers/ContractController';
import ContractItemController from './app/controllers/ContractItemController';
import MaterialController from './app/controllers/MaterialController';

import ClientStore from './app/validators/ClientStore';
import ClietnUpdate from './app/validators/ClientUpdate';

import ContractStore from './app/validators/ContractStore';
import ContractUpdate from './app/validators/ContractUpdate';

import ContractItemStore from './app/validators/ContractItemStore';

import MaterialStore from './app/validators/MaterialStore';
import MaterialUpdate from './app/validators/MaterialUpdate';

const routes = new Router();

routes.get('/clients', ClientController.index);
routes.get('/clients/:id', ClientController.show);
routes.post('/clients', ClientStore, ClientController.store);
routes.put('/clients/:id', ClietnUpdate, ClientController.update);
routes.delete('/clients/:id', ClientController.destroy);

routes.get('/materials', MaterialController.index);
routes.post('/materials', MaterialStore, MaterialController.store);
routes.put('/materials/:id', MaterialUpdate, MaterialController.update);

routes.get('/contracts', ContractController.index);
routes.get('/contracts/:id', ContractController.show);
routes.post('/contracts', ContractStore, ContractController.store);
routes.put('/contracts/:id', ContractUpdate, ContractController.update);

routes.post('/contractItems', ContractItemStore, ContractItemController.store);

export default routes;
