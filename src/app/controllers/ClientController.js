import Client from '../models/Client';
import Order from '../models/Order';

class ClientController {
  async store(req, res) {
    /* fazer verificação dos dados via Yup */

    const clientExists = await Client.findOne({ where: { cpf: req.body.cpf } });

    if (clientExists) {
      return res.status(400).json({ error: 'Client already exists' });
    }

    const { name, cpf, telefone, endereco } = req.body;

    const { id } = await Client.create({ name, cpf, telefone, endereco });

    return res.json({
      id,
      name,
      cpf,
      telefone,
      endereco,
    });
  }

  async update(req, res) {
    const { id } = req.params;

    const client = await Client.findByPk(id);

    if (!client) {
      return res.status(400).json({ error: 'Client does not exists' });
    }

    const { name, cpf, telefone, endereco } = req.body;

    const clientCPFUsed = await Client.findOne({
      where: { cpf: req.body.cpf },
    });

    if (clientCPFUsed && clientCPFUsed.id !== Number(id)) {
      return res.status(400).json({ error: 'CPF already registered' });
    }

    await client.update({ name, cpf, telefone, endereco });

    return res.status(200).json({ id, name, cpf, telefone, endereco });
  }

  async index(req, res) {
    const clients = await Client.findAll({
      attributes: ['id', 'name', 'cpf', 'telefone', 'endereco'],
    });

    return res.json(clients);
  }

  async destroy(req, res) {
    const { id: client_id } = req.params;

    const clientExistis = await Client.findOne({ where: { id: client_id } });

    if (!clientExistis) {
      return res.status(400).json({ error: 'Client does not exists' });
    }

    const orderExists = await Order.findOne({ where: { client_id } });
    if (orderExists) {
      return res.status(400).json({ error: 'This client has a rent register' });
    }

    await clientExistis.destroy();

    return res.status(200).json({});
  }
}

export default new ClientController();
