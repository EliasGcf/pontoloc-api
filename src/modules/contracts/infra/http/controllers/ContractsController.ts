import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateContractService from '@modules/contracts/services/CreateContractService';
import FinishContractService from '@modules/contracts/services/FinishContractService';
import ListContractsByCreatedDescOrderWithClientService from '@modules/contracts/services/ListContractsByCreatedDescOrderWithClientService';
import ListContractWithAllRelationsService from '@modules/contracts/services/ListContractWithAllRelationsService';

export default class ContractsController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { client_id, materials, delivery_price } = req.body;

    const createContract = container.resolve(CreateContractService);

    const contract = await createContract.execute({
      client_id,
      delivery_price,
      materials,
    });

    return res.json(contract);
  }

  public async index(req: Request, res: Response): Promise<Response> {
    const listContractsByCreatedDescOrderWithClient = container.resolve(
      ListContractsByCreatedDescOrderWithClientService,
    );

    const contracts = await listContractsByCreatedDescOrderWithClient.execute();

    return res.json(contracts);
  }

  public async show(req: Request, res: Response): Promise<Response> {
    const contract_id = req.params.id;

    const listContractWithAllRelations = container.resolve(
      ListContractWithAllRelationsService,
    );

    const contract = await listContractWithAllRelations.execute({
      contract_id,
    });

    return res.json(contract);
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const { collect_price } = req.body;
    const contract_id = req.params.id;

    const finishContract = container.resolve(FinishContractService);

    const contract = await finishContract.execute({
      contract_id,
      collect_price,
    });

    return res.json(contract);
  }
}
