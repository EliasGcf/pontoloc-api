import Contract from '../models/Contract';
import ContractItem from '../models/ContractItem';

class ContractController {
  async store(req, res) {
    const { client_id, materials } = req.body;

    const contract = await Contract.create({ client_id });

    materials.forEach(async material => {
      await ContractItem.create({
        contract_id: contract.id,
        material_id: material.id,
        quantity: material.quantity,
      });
    });

    return res.json(contract);
  }
}

export default new ContractController();
