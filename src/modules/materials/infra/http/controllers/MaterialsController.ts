import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateMaterialService from '@modules/materials/services/CreateMaterialService';
import UpdateMaterialService from '@modules/materials/services/UpdateMaterialService';
import ListMaterialsService from '@modules/materials/services/ListMaterialsService';

export default class MaterialsController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { name, daily_price } = req.body;

    const craeteMaterial = container.resolve(CreateMaterialService);

    const material = await craeteMaterial.execute({ name, daily_price });

    return res.status(201).json(material);
  }

  public async index(req: Request, res: Response): Promise<Response> {
    const { page, name } = req.query;
    const listMaterials = container.resolve(ListMaterialsService);

    const { materials, count } = await listMaterials.execute({
      name: String(name),
      page: Number(page),
    });

    res.header('X-Total-Count', `${count}`);
    res.header('Access-Control-Expose-Headers', 'X-Total-Count');

    return res.json(materials);
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const { daily_price } = req.body;
    const material_id = req.params.id;

    const updateMaterial = container.resolve(UpdateMaterialService);

    await updateMaterial.execute({ material_id, daily_price });

    return res.status(204).json();
  }
}
