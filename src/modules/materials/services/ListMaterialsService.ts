import { injectable, inject } from 'tsyringe';

import Material from '@modules/materials/infra/typeorm/entities/Material';
import IMaterialsRepository from '@modules/materials/repositories/IMaterialsRepository';

interface IRequest {
  page: number;
  name: string;
}

interface IResponse {
  materials: Material[];
  count: number;
}

@injectable()
class ListMaterialsService {
  constructor(
    @inject('MaterialsRepository')
    private materialsRepository: IMaterialsRepository,
  ) {}

  public async execute({ page, name }: IRequest): Promise<IResponse> {
    const {
      materials,
      count,
    } = await this.materialsRepository.findAllWithPaginationAndSearch({
      name,
      page,
    });

    return { materials, count };
  }
}

export default ListMaterialsService;
