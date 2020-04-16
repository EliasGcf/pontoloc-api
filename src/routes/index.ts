import { Router } from 'express';

import clientRouter from './client.routes';

// import seus arquivos de rotas

const routes = Router();

routes.use('/clients', clientRouter);

export default routes;
