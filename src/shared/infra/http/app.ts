import 'reflect-metadata';
import 'dotenv/config';
import { errors } from 'celebrate';
import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import 'express-async-errors';

import AppError from '@shared/errors/AppError';

import '@shared/container';
import createConnection from '@shared/infra/typeorm';

import routes from './routes';

createConnection();
const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);
app.use(errors());

app.use((err: Error, req: Request, res: Response, _: NextFunction) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    });
  }

  console.log(err);

  return res.status(500).json({
    status: 'error',
    message: 'Internal server error',
  });
});

export default app;
