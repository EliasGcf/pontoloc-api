import { Router } from 'express';

import ClientController from './app/controllers/ClientController';
import ItemController from './app/controllers/ItemController';
import RentController from './app/controllers/RentController';

const routes = new Router();

routes.get('/clients', ClientController.index);
routes.post('/clients', ClientController.store);
routes.put('/clients/:id', ClientController.update);
routes.delete('/clients/:id', ClientController.destroy);

routes.post('/items', ItemController.store);

routes.post('/rents', RentController.store);

export default routes;
