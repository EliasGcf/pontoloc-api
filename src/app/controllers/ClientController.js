import Client from '../models/Client';
import Rent from '../models/Rent';

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

    if (req.body.cpf) {
      const clientCPFused = await Client.findOne({
        where: { cpf: req.body.cpf },
      });

      if (clientCPFused) {
        return res.status(400).json({ error: 'CPF already registered' });
      }
    }

    await Client.update(req.body, {
      where: { id },
    });

    const { name, cpf, telefone, endereco } = await Client.findByPk(id);

    return res.status(200).json({ id, name, cpf, telefone, endereco });
  }

  async index(req, res) {
    const clients = await Client.findAll();

    return res.json(clients);
  }

  async destroy(req, res) {
    const { id: client_id } = req.params;

    const clientExistis = await Client.findOne({ where: { id: client_id } });

    if (!clientExistis) {
      return res.status(400).json({ error: 'Client does not exists' });
    }

    const rentExists = await Rent.findOne({ where: { client_id } });
    if (rentExists) {
      return res.status(400).json({ error: 'This client has a rent register' });
    }

    await clientExistis.destroy();

    return res.status(200).json({});
  }
}

export default new ClientController();
