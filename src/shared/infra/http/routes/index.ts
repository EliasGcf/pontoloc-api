import { Router } from 'express';

import ensureAuthenticade from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import clientsRouter from '@modules/clients/infra/http/routes/clients.routes';
import sessionsRouter from '@modules/users/infra/http/routes/sessions.routes';
import materialsRouter from '@modules/materials/infra/http/routes/materials.routes';
import contractsRouter from '@modules/contracts/infra/http/routes/contracts.routes';

const routes = Router();

routes.use('/sessions', sessionsRouter);

routes.use(ensureAuthenticade);
routes.use('/clients', clientsRouter);
routes.use('/materials', materialsRouter);
routes.use('/contracts', contractsRouter);

export default routes;
