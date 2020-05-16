import { injectable, inject } from 'tsyringe';

import IMaterialsRepository from '@modules/materials/repositories/IMaterialsRepository';

import Material from '@modules/materials/infra/typeorm/entities/Material';
import AppError from '@shared/errors/AppError';

interface IRequest {
  name: string;
  daily_price: number;
}

@injectable()
class CreateMaterialService {
  constructor(
    @inject('MaterialsRepository')
    private materialsRepository: IMaterialsRepository,
  ) {}

  public async execute({ name, daily_price }: IRequest): Promise<Material> {
    const materialExists = await this.materialsRepository.findByName(
      name.toLowerCase(),
    );

    if (materialExists) {
      throw new AppError('Material already exists');
    }

    const material = await this.materialsRepository.create({
      name: name.toLowerCase(),
      daily_price,
    });

    return material;
  }
}

export default CreateMaterialService;
