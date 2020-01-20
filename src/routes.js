import { Router } from 'express';

import ClientController from './app/controllers/ClientController';
import ContractController from './app/controllers/ContractController';
import MaterialController from './app/controllers/MaterialController';

const routes = new Router();

routes.get('/clients', ClientController.index);
routes.post('/clients', ClientController.store);
routes.put('/clients/:id', ClientController.update);
routes.delete('/clients/:id', ClientController.destroy);

routes.post('/materials', MaterialController.store);
routes.put('/materials/:id', MaterialController.update);
routes.get('/materials', MaterialController.index);

routes.post('/contracts', ContractController.store);

export default routes;
