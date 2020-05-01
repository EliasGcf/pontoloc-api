import { Router } from 'express';

import ensureAuthenticade from '@middlewares/ensureAuthenticated';
import clientsRouter from './clients.routes';
import sessionsRouter from './sessions.routes';
import materialsRouter from './materials.routes';
import contractsRouter from './contracts.routes';

const routes = Router();

routes.use('/sessions', sessionsRouter);

routes.use(ensureAuthenticade);
routes.use('/clients', clientsRouter);
routes.use('/materials', materialsRouter);
routes.use('/contracts', contractsRouter);

export default routes;
