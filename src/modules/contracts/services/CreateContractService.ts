import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IContractsRepository from '@modules/contracts/repositories/IContractsRepository';
import IClientsRepository from '@modules/clients/repositories/IClientsRepository';
import IMaterialsRepository from '@modules/materials/repositories/IMaterialsRepository';

// import ContractItem from '@models/ContractItem';
// import Client from '@models/Client';
import Contract from '@modules/contracts/infra/typeorm/entities/Contract';
// import Material from '@models/Material';

interface IMaterialDTO {
  id: string;
  quantity: number;
}

interface IRequest {
  client_id: string;
  materials: IMaterialDTO[];
  delivery_price: number;
}

@injectable()
class CreateContractService {
  constructor(
    @inject('ContractsRepository')
    private contractsRepository: IContractsRepository,

    @inject('ClientsRepository')
    private clientsRepository: IClientsRepository,

    @inject('MaterialsRepository')
    private materialsRepository: IMaterialsRepository,
  ) {}

  public async execute({
    client_id,
    materials,
    delivery_price = 0,
  }: IRequest): Promise<Contract> {
    const client = await this.clientsRepository.findById(client_id);

    if (!client) {
      throw new AppError('Client does not exists');
    }

    const databaseMaterials = await this.materialsRepository.findAllById(
      materials.map(material => ({ id: material.id })),
    );

    if (materials.length !== databaseMaterials.length) {
      throw new AppError('Invalid materials list');
    }

    const contractItems = materials.map(material => {
      const materialPrice = databaseMaterials.find(
        findMaterial => findMaterial.id === material.id,
      )?.daily_price;

      if (!materialPrice) {
        throw new AppError('Material price not found');
      }

      return {
        material_id: material.id,
        quantity: material.quantity,
        price_quantity_daily: material.quantity * materialPrice,
      };
    });

    const daily_total_price = contractItems.reduce(
      (increment, contractItem) => {
        return increment + contractItem.price_quantity_daily;
      },
      0,
    );

    const contract = await this.contractsRepository.create({
      client,
      daily_total_price,
      delivery_price,
      materials: contractItems,
    });

    return contract;
  }
}

export default CreateContractService;
