import { getRepository, IsNull, Not } from 'typeorm';
import { Router } from 'express';

import CreateClientService from '@services/CreateClientService';
import UpdateClientService from '@services/UpdateClientService';
import DeleteClientService from '@services/DeleteClientService';
import Client from '@models/Client';
import AppError from '@errors/AppError';

const clientsRouter = Router();

clientsRouter.use('/:id', async (req, res, next) => {
  const clientsRepository = getRepository(Client);
  const { id } = req.params;

  const client = await clientsRepository.findOne(id);

  if (!client) {
    throw new AppError('Client does not exists');
  }

  req.client = client;

  return next();
});

clientsRouter.post('/', async (req, res) => {
  const { name, cpf, phone_number, address } = req.body;

  const createClient = new CreateClientService();

  const client = await createClient.execute({
    name,
    cpf,
    phone_number,
    address,
  });

  return res.status(201).json(client);
});

clientsRouter.get('/', async (req, res) => {
  const { deleted } = req.query;

  const clientsRepository = getRepository(Client);

  const clients = await clientsRepository.find({
    withDeleted: !!deleted,
    where: { deleted_at: deleted ? Not(IsNull()) : IsNull() },
  });

  return res.json(clients);
});

clientsRouter.get('/:id', async (req, res) => {
  const { id } = req.params;
  const clientsRepository = getRepository(Client);

  const client = await clientsRepository.findOne(id);

  return res.json(client);
});

clientsRouter.put('/:id', async (req, res) => {
  const { name, cpf, phone_number, address } = req.body;

  const updateClient = new UpdateClientService();

  await updateClient.execute({
    client: req.client,
    name,
    cpf,
    phone_number,
    address,
  });

  return res.status(204).end();
});

clientsRouter.delete('/:id', async (req, res) => {
  const deleteClient = new DeleteClientService();

  await deleteClient.execute({ id: req.client.id });

  return res.status(200).end();
});

export default clientsRouter;