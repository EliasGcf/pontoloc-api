import { Router } from 'express';

import SessionsController from '@modules/users/infra/http/controllers/SessionsController';

import validateSessionCreate from '@modules/users/infra/http/validators/SessionCreate';

const sessionsRouter = Router();
const sessionsController = new SessionsController();

sessionsRouter.post('/', validateSessionCreate, sessionsController.create);

export default sessionsRouter;
