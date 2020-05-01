import { getRepository, IsNull, Not } from 'typeorm';
import { Router } from 'express';

import CreateClientService from '@services/CreateClientService';
import UpdateClientService from '@services/UpdateClientService';
import DeleteClientService from '@services/DeleteClientService';
import Client from '@models/Client';
import AppError from '@errors/AppError';

import clientExistsMiddleware from '@middlewares/clientExists';

const clientsRouter = Router();

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
    order: { name: 'ASC' },
    select: ['id', 'name', 'cpf', 'phone_number', 'address'],
  });

  return res.json(clients);
});

clientsRouter.get('/:id', async (req, res) => {
  const {
    client: { id },
  } = req;
  const clientsRepository = getRepository(Client);

  const client = await clientsRepository.findOne(id, {
    relations: [
      'contracts',
      'contracts.contract_items',
      'contracts.contract_items.material',
    ],
    select: ['id', 'name', 'cpf', 'phone_number', 'address'],
  });

  if (!client) {
    throw new AppError('Client does not exists');
  }

  return res.json(client);
});

clientsRouter.put('/:id', async (req, res) => {
  const { name, cpf, phone_number, address } = req.body;

  const updateClient = new UpdateClientService();

  await updateClient.execute({
    client_id: req.params.id,
    name,
    cpf,
    phone_number,
    address,
  });

  return res.status(204).end();
});

clientsRouter.delete('/:id', clientExistsMiddleware, async (req, res) => {
  const deleteClient = new DeleteClientService();

  await deleteClient.execute({ id: req.client.id });

  return res.status(200).end();
});

export default clientsRouter;
