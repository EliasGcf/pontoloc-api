import { getRepository } from 'typeorm';
import { Router } from 'express';

import CreateClientService from '@services/CreateClientService';
import UpdateClientService from '@services/UpdateClientService';
import DeleteClientService from '@services/DeleteClientService';
import Client from '@models/Client';
import AppError from '@errors/AppError';

const clientRouter = Router();

clientRouter.use('/:id', async (req, res, next) => {
  const clientsRepository = getRepository(Client);
  const { id } = req.params;

  const client = await clientsRepository.findOne(id);

  if (!client) {
    throw new AppError('Client does not exists');
  }

  req.client = client;

  return next();
});

clientRouter.post('/', async (req, res) => {
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

clientRouter.get('/', async (req, res) => {
  const clientsRepository = getRepository(Client);

  const clients = await clientsRepository.find();

  return res.json(clients);
});

clientRouter.get('/:id', async (req, res) => {
  const { id } = req.params;
  const clientsRepository = getRepository(Client);

  const client = await clientsRepository.findOne(id);

  return res.json(client);
});

clientRouter.put('/:id', async (req, res) => {
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

clientRouter.delete('/:id', async (req, res) => {
  const deleteClient = new DeleteClientService();

  await deleteClient.execute({ id: req.client.id });

  return res.status(200).end();
});

export default clientRouter;
