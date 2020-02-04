import { isValid } from 'cpf';
import Client from '../models/Client';
import Contract from '../models/Contract';

import UpdateClientService from '../services/UpdateClientService';

class ClientController {
  async store(req, res) {
    const clientExists = await Client.findOne({ where: { cpf: req.body.cpf } });

    /*
     * Check if client already exists
     */
    if (clientExists) {
      return res.status(400).json({ error: 'Cliente já cadastrado' });
    }

    const { name, cpf, telefone, endereco } = req.body;

    /*
     * Check if CPF is valid
     */
    if (!isValid(cpf)) {
      return res.status(400).json({ error: 'CPF inválido!' });
    }

    /*
     * Check if telefone is valid
     */
    if (telefone.match(/\(\d{2}\)\s\d{1}\s\d{4}-\d{4}/g) === null) {
      return res.status(400).json({ error: 'Telefone inválido' });
    }

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
    const { name, cpf, telefone, endereco } = req.body;

    try {
      await UpdateClientService.run({ id, name, cpf, telefone, endereco });
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }

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

    /*
     * Check if client exists
     */
    if (!clientExistis) {
      return res.status(400).json({ error: 'Client does not exists' });
    }

    const contractExists = await Contract.findOne({ where: { client_id } });

    /*
     * Check if client has a contract
     */
    if (contractExists) {
      return res
        .status(400)
        .json({ error: 'This client has a contract register' });
    }

    await clientExistis.destroy();

    return res.status(200).json({});
  }
}

export default new ClientController();
