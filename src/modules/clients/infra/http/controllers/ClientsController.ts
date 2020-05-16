import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateClientService from '@modules/clients/services/CreateClientService';
import UpdateClientService from '@modules/clients/services/UpdateClientService';
import ListClientsService from '@modules/clients/services/ListClientsService';

export default class ClientsController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { name, cpf, phone_number, address } = req.body;

    const createClient = container.resolve(CreateClientService);

    const client = await createClient.execute({
      name,
      cpf,
      phone_number,
      address,
    });

    return res.json(client);
  }

  public async index(req: Request, res: Response): Promise<Response> {
    const { deleted } = req.query;

    const listClients = container.resolve(ListClientsService);

    const clients = await listClients.execute({ deleted: !!deleted });

    return res.json(clients);
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const { name, cpf, phone_number, address } = req.body;

    const updateClient = container.resolve(UpdateClientService);

    await updateClient.execute({
      name,
      cpf,
      phone_number,
      address,
      client_id: req.params.id,
    });

    return res.status(204).json();
  }
}
