import 'reflect-metadata';
import 'dotenv/config';
import { errors as celebrateErrors } from 'celebrate';
import express, { Request, Response, NextFunction, Express } from 'express';
import cors from 'cors';
import 'express-async-errors';

import AppError from '@shared/errors/AppError';

import '@shared/container';
import createConnection from '@shared/infra/typeorm';

import routes from './routes';

createConnection();

class App {
  public server: Express;

  constructor() {
    this.server = express();

    this.middlewares();
    this.routes();
    this.errors();
  }

  middlewares(): void {
    this.server.use(cors());
    this.server.use(express.json());
  }

  routes(): void {
    this.server.use(routes);
  }

  errors(): void {
    this.server.use(celebrateErrors());
    this.server.use(
      (err: Error, req: Request, res: Response, _: NextFunction) => {
        if (err instanceof AppError) {
          return res.status(err.statusCode).json({
            status: 'error',
            message: err.message,
          });
        }
        // eslint-disable-next-line
        console.log(err);

        return res.status(500).json({
          status: 'error',
          message: 'Internal server error',
        });
      },
    );
  }
}

export default new App().server;
