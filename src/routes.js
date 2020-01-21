import { Router } from 'express';

import ClientController from './app/controllers/ClientController';
import ContractController from './app/controllers/ContractController';
import ContractItemController from './app/controllers/ContractItemController';
import MaterialController from './app/controllers/MaterialController';

const routes = new Router();

routes.get('/clients', ClientController.index);
routes.post('/clients', ClientController.store);
routes.put('/clients/:id', ClientController.update);
routes.delete('/clients/:id', ClientController.destroy);

routes.get('/materials', MaterialController.index);
routes.post('/materials', MaterialController.store);
routes.put('/materials/:id', MaterialController.update);

routes.get('/contracts', ContractController.index);
routes.get('/contracts/:id', ContractController.show);
routes.post('/contracts', ContractController.store);

routes.post('/contractItems', ContractItemController.store);

export default routes;
