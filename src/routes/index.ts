import { Router } from 'express';

import ensureAuthenticade from '@middlewares/ensureAuthenticated';
import clientsRouter from './clients.routes';
import sessionsRouter from './sessions.routes';

const routes = Router();

routes.use('/sessions', sessionsRouter);

routes.use(ensureAuthenticade);
routes.use('/clients', clientsRouter);

export default routes;
