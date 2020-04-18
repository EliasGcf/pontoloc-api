import { getRepository } from 'typeorm';

import Material from '@models/Material';

interface Request {
  material: Material;
  daily_price: number;
}

class UpdateMaterialService {
  public async execute({ material, daily_price }: Request): Promise<void> {
    const materialsRepository = getRepository(Material);

    material.daily_price = daily_price;

    await materialsRepository.save(material);
  }
}

export default UpdateMaterialService;
