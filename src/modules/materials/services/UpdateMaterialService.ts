import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IMaterialsRepository from '@modules/materials/repositories/IMaterialsRepository';

interface IRequest {
  material_id: string;
  daily_price: number;
}

@injectable()
class UpdateMaterialService {
  constructor(
    @inject('MaterialsRepository')
    private materialsRepository: IMaterialsRepository,
  ) {}

  public async execute({ material_id, daily_price }: IRequest): Promise<void> {
    const material = await this.materialsRepository.findById(material_id);

    if (!material) {
      throw new AppError('Material does not exists');
    }

    Object.assign(material, { daily_price });

    await this.materialsRepository.save(material);
  }
}

export default UpdateMaterialService;
