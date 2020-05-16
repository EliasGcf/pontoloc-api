import { Router } from 'express';

import validateSessionCreate from '@validators/SessionCreate';

import AuthenticateUserService from '@services/AuthenticateUserService';

const sessionsRouter = Router();

sessionsRouter.post('/', validateSessionCreate, async (req, res) => {
  const { email, password } = req.body;

  const authenticateUser = new AuthenticateUserService();

  const { user, token } = await authenticateUser.execute({ email, password });

  delete user.password_hash;

  return res.json({ user, token });
});

export default sessionsRouter;
