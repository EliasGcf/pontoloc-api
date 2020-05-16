import { getRepository, Repository } from 'typeorm';

import IMaterialsRepository from '@modules/materials/repositories/IMaterialsRepository';
import ICreateMaterialDTO from '@modules/materials/dtos/ICreateMaterialDTO';

import Material from '@modules/materials/infra/typeorm/entities/Material';

interface IFindMaterials {
  id: string;
}

export default class MaterialsRepository implements IMaterialsRepository {
  private ormRepository: Repository<Material>;

  constructor() {
    this.ormRepository = getRepository(Material);
  }

  public async findByName(name: string): Promise<Material | undefined> {
    const material = await this.ormRepository.findOne({ where: { name } });

    return material;
  }

  public async findById(id: string): Promise<Material | undefined> {
    const material = await this.ormRepository.findOne(id);

    return material;
  }

  public async findAllById(materials: IFindMaterials[]): Promise<Material[]> {
    const FindMaterials = await this.ormRepository.findByIds(materials);

    return FindMaterials;
  }

  public async create({
    name,
    daily_price,
  }: ICreateMaterialDTO): Promise<Material> {
    const material = this.ormRepository.create({ name, daily_price });

    await this.ormRepository.save(material);

    return material;
  }

  public async save(material: Material): Promise<Material> {
    return this.ormRepository.save(material);
  }
}
