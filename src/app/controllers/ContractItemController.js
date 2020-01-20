import ContractItem from '../models/ContractItem';

class ContractItemController {
  async store(req, res) {
    const orderItem = await ContractItem.create(req.body);

    return res.json(orderItem);
  }
}

export default new ContractItemController();
