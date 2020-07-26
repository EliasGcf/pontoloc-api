import { inject, injectable } from 'tsyringe';

import Material from '@modules/materials/infra/typeorm/entities/Material';
import IMaterialsRepository from '@modules/materials/repositories/IMaterialsRepository';

interface IRequest {
  id: string;
}

@injectable()
class ShowMaterialService {
  constructor(
    @inject('MaterialsRepository')
    private materialsRepository: IMaterialsRepository,
  ) {}

  public async execute({ id }: IRequest): Promise<Material | undefined> {
    const material = await this.materialsRepository.findById(id);

    return material;
  }
}

export default ShowMaterialService;
