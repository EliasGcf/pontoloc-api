import { Request, Response } from 'express';
import { container } from 'tsyringe';

import SoftDeleteClientService from '@modules/clients/services/SoftDeleteClientService';

export default class SoftDeleteClientsController {
  public async delete(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const softDeleteClient = container.resolve(SoftDeleteClientService);

    await softDeleteClient.execute({ id });

    return res.status(204).json();
  }
}
