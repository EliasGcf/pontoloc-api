import Client from '../models/Client';

class UpdateClientService {
  async run({ id, name, cpf, telefone, endereco }) {
    const client = await Client.findByPk(id);

    /**
     * Check client exists
     */
    if (!client) {
      throw new Error('Client does not exists');
    }

    const clientCPFUsed = await Client.findOne({
      where: { cpf },
    });

    /**
     * Check client cpf already registred
     */
    if (clientCPFUsed && clientCPFUsed.id !== Number(id)) {
      throw new Error('CPF already registered');
    }

    await client.update({ name, cpf, telefone, endereco });

    return client;
  }
}

export default new UpdateClientService();
