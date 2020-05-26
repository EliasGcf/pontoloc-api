import Material from '@modules/materials/infra/typeorm/entities/Material';
import ICreateMaterialDTO from '@modules/materials/dtos/ICreateMaterialDTO';
import IFindAllWithPaginationAndSearchDTO from '@modules/materials/dtos/IFindAllWithPaginationAndSearchDTO';

interface IFindMaterials {
  id: string;
}

interface IResponseFindAllWithPaginationAndSearch {
  materials: Material[];
  count: number;
}

export default interface IMaterialsRepository {
  findAllWithPaginationAndSearch(
    data: IFindAllWithPaginationAndSearchDTO,
  ): Promise<IResponseFindAllWithPaginationAndSearch>;
  findAllById(materials: IFindMaterials[]): Promise<Material[]>;
  findById(id: string): Promise<Material | undefined>;
  findByName(name: string): Promise<Material | undefined>;
  create(data: ICreateMaterialDTO): Promise<Material>;
  save(material: Material): Promise<Material>;
}
