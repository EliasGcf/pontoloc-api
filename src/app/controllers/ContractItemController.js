import * as Yup from 'yup';

import Contract from '../models/Contract';
import ContractItem from '../models/ContractItem';
import Material from '../models/Material';

class ContractItemController {
  async store(req, res) {
    const schema = Yup.object().shape({
      contract_id: Yup.number().required(),
      material_id: Yup.number().required(),
      quantity: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { contract_id, material_id, quantity } = req.body;

    const contractExists = await Contract.findByPk(contract_id);

    if (!contractExists) {
      return res.status(400).json({ error: 'Contract does not exists' });
    }

    const materialExists = await Material.findByPk(material_id);

    if (!materialExists) {
      return res.status(400).json({ error: 'Material does not exists' });
    }

    const { id, price_quantity_day } = await ContractItem.create({
      contract_id,
      material_id,
      quantity,
    });

    await contractExists.update({
      price_total_day: contractExists.price_total_day + price_quantity_day,
    });

    return res.json({
      id,
      contract_id,
      material_id,
      quantity,
      price_quantity_day,
    });
  }
}

export default new ContractItemController();
