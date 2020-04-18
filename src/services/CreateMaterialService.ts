import { getRepository } from 'typeorm';

import Material from '@models/Material';
import AppError from '@errors/AppError';

interface Request {
  name: string;
  daily_price: number;
}

class CreateMaterialService {
  public async execute({ name, daily_price }: Request): Promise<Material> {
    const materialsRepository = getRepository(Material);

    const materialExists = await materialsRepository.findOne({
      where: { name: name.toLowerCase() },
    });

    if (materialExists) {
      throw new AppError('Material already exists');
    }

    const material = materialsRepository.create({
      name: name.toLowerCase(),
      daily_price,
    });

    await materialsRepository.save(material);

    return material;
  }
}

export default CreateMaterialService;
