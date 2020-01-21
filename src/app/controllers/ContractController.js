import Client from '../models/Client';
import Contract from '../models/Contract';
import ContractItem from '../models/ContractItem';
import Material from '../models/Material';

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

  async index(req, res) {
    const contracts = await Contract.findAll({
      attributes: ['id', 'price_total_day', 'returned_at', 'createdAt'],
      include: [
        {
          model: Client,
          as: 'client',
          attributes: ['id', 'name'],
        },
      ],
    });

    return res.json(contracts);
  }

  async show(req, res) {
    const { id } = req.params;

    const {
      price_total_day,
      returned_at,
      createdAt,
      client,
    } = await Contract.findOne({
      where: { id },
      attributes: ['id', 'price_total_day', 'returned_at', 'createdAt'],
      include: [
        {
          model: Client,
          as: 'client',
          attributes: ['id', 'name', 'cpf', 'telefone', 'endereco'],
        },
      ],
    });

    const items = await ContractItem.findAll({
      where: { contract_id: id },
      attributes: ['id', 'quantity', 'price_quantity_day'],
      include: [
        {
          model: Material,
          as: 'material',
          attributes: ['id', 'name', 'price_day'],
        },
      ],
    });

    return res.json({
      id,
      price_total_day,
      returned_at,
      createdAt,
      client,
      items,
    });
  }
}

export default new ContractController();
