import { getRepository } from 'typeorm';

import AppError from '@errors/AppError';

import ContractItem from '@models/ContractItem';
import Client from '@models/Client';
import Contract from '@models/Contract';
import Material from '@models/Material';

interface MaterialData {
  id: string;
  quantity: number;
}

interface Request {
  client_id: string;
  materials: MaterialData[];
  delivery_price?: number;
}

class CreateContractService {
  public async execute({
    client_id,
    materials,
    delivery_price,
  }: Request): Promise<Contract> {
    const clientsRepository = getRepository(Client);

    const clientExists = await clientsRepository.findOne(client_id);

    if (!clientExists) {
      throw new AppError('Client does not exists');
    }

    const contractItemsRepository = getRepository(ContractItem);
    const materialsRepository = getRepository(Material);
    const contractsRepository = getRepository(Contract);

    const materialsDatabaseWithQuantity = await materialsRepository
      .findByIds(materials.map(material => material.id))
      .then(response =>
        response.map(material => ({
          ...material,
          quantity: materials.find(m => m.id === material.id)?.quantity,
        })),
      )
      .catch(err => {
        throw new AppError(err.message);
      });

    const contract = contractsRepository.create({ client_id, delivery_price });

    const newContractItems: ContractItem[] = [];

    contract.daily_total_price = materialsDatabaseWithQuantity.reduce(
      (value, material) => {
        const newContractItem = contractItemsRepository.create({
          material_id: material.id,
          quantity: material.quantity,
          price_quantity_daily: (material.quantity || 0) * material.daily_price,
        });

        newContractItems.push(newContractItem);

        return value + (material.quantity || 0) * material.daily_price;
      },
      0,
    );

    const newContract = await contractsRepository.save(contract);

    await contractItemsRepository.save(
      newContractItems.map(contractItem => ({
        ...contractItem,
        contract_id: newContract.id,
      })),
    );

    return newContract;
  }
}

export default CreateContractService;
