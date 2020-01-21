import Client from '../models/Client';
import Contract from '../models/Contract';
import ContractItem from '../models/ContractItem';
import Material from '../models/Material';

class ContractController {
  async store(req, res) {
    const { client_id } = req.body;

    const clientExists = await Client.findByPk(client_id);

    if (!clientExists) {
      return res.status(400).json({ error: 'Client does not exists' });
    }

    const {
      id,
      createdAt,
      price_total_day,
      returned_at,
    } = await Contract.create({ client_id });

    return res.json({ id, client_id, price_total_day, returned_at, createdAt });
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
