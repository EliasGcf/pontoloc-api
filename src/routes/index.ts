import { Router } from 'express';

import clientsRouter from './clients.routes';
import sessionsRouter from './sessions.routes';

// import seus arquivos de rotas

const routes = Router();

routes.use('/clients', clientsRouter);
routes.use('/sessions', sessionsRouter);

export default routes;
