import Contract from '../models/Contract';
import ContractItem from '../models/ContractItem';

class ContractController {
  async store(req, res) {
    const { client_id, materials } = req.body;

    const order = await Contract.create({ client_id });

    materials.forEach(async material => {
      await ContractItem.create({
        order_id: order.id,
        material_id: material.id,
        quantity: material.quantity,
      });
    });

    return res.json(order);
  }
}

export default new ContractController();
