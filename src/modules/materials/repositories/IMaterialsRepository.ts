import Material from '@modules/materials/infra/typeorm/entities/Material';
import ICreateMaterialDTO from '@modules/materials/dtos/ICreateMaterialDTO';

interface IFindMaterials {
  id: string;
}

export default interface IMaterialsRepository {
  findAllById(materials: IFindMaterials[]): Promise<Material[]>;
  findById(id: string): Promise<Material | undefined>;
  findByName(name: string): Promise<Material | undefined>;
  create(data: ICreateMaterialDTO): Promise<Material>;
  save(material: Material): Promise<Material>;
}
