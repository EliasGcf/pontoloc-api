import { Request, Response, NextFunction } from 'express';
import { getRepository } from 'typeorm';

import AppError from '@errors/AppError';
import Client from '@models/Client';

export default async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  const clientsRepository = getRepository(Client);
  const { id } = req.params;

  const client = await clientsRepository.findOne(id);

  if (!client) {
    throw new AppError('Client does not exists');
  }

  req.client = {
    id: client.id,
  };

  return next();
};
