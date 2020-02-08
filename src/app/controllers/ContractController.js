import Client from '../models/Client';
import Contract from '../models/Contract';
import ContractItem from '../models/ContractItem';
import Material from '../models/Material';

class ContractController {
  async store(req, res) {
    const { client_id, delivery_price } = req.body;

    const clientExists = await Client.findByPk(client_id);

    if (!clientExists) {
      return res.status(400).json({ error: 'Client does not exists' });
    }

    const { id, returned_at, createdAt } = await Contract.create({
      client_id,
      delivery_price,
    });

    const items = await Promise.all(
      req.body.items.map(async item => {
        const material = await Material.findByPk(item.material_id);
        const price_quantity_day = material.price_day * item.quantity;
        return {
          ...item,
          contract_id: id,
          price_quantity_day,
        };
      })
    );

    const contractItems = await ContractItem.bulkCreate(items);

    const price_total_day = contractItems.reduce(
      (total, item) => total + item.price_quantity_day,
      0
    );

    await Contract.update({ price_total_day }, { where: { id } });

    return res.json({
      id,
      client_id,
      price_total_day,
      delivery_price,
      returned_at,
      createdAt,
    });
  }

  async index(req, res) {
    const contracts = await Contract.findAll({
      attributes: [
        'id',
        'price_total_day',
        'delivery_price',
        'collet_price',
        'returned_at',
        'createdAt',
      ],
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
      delivery_price,
      collet_price,
      final_price,
      returned_at,
      createdAt,
      client,
    } = await Contract.findOne({
      where: { id },
      attributes: [
        'id',
        'price_total_day',
        'delivery_price',
        'collet_price',
        'final_price',
        'returned_at',
        'createdAt',
      ],
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
      delivery_price,
      collet_price,
      final_price,
      returned_at,
      createdAt,
      client,
      items,
    });
  }

  async update(req, res) {
    const { id } = req.params;

    const { returned_at, collet_price, final_price } = req.body;

    const contract = await Contract.findByPk(id);

    if (!contract) {
      return res.status(400).json({ error: 'Contract does not exists' });
    }

    await contract.update({ returned_at, collet_price, final_price });

    const { price_total_day, delivery_price, client_id, createdAt } = contract;

    return res.json({
      id,
      client_id,
      price_total_day,
      delivery_price,
      collet_price,
      final_price,
      createdAt,
      returned_at,
    });
  }
}

export default new ContractController();
