import Sequelize, { Model } from 'sequelize';

class Client extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        cpf: Sequelize.STRING,
        telefone: Sequelize.STRING,
        endereco: Sequelize.STRING,
      },
      {
        sequelize,
      }
    );

    return this;
  }
}

export default Client;
