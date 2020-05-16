import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateMaterialService from '@modules/materials/services/CreateMaterialService';
import UpdateMaterialService from '@modules/materials/services/UpdateMaterialService';

export default class MaterialsController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { name, daily_price } = req.body;

    const craeteMaterial = container.resolve(CreateMaterialService);

    const material = await craeteMaterial.execute({ name, daily_price });

    return res.status(201).json(material);
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const { daily_price } = req.body;
    const material_id = req.params.id;

    const updateMaterial = container.resolve(UpdateMaterialService);

    await updateMaterial.execute({ material_id, daily_price });

    return res.status(204).json();
  }
}
