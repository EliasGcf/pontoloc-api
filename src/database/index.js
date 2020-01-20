import Sequelize from 'sequelize';

import databaseConfig from '../config/database';

import Client from '../app/models/Client';
import Contract from '../app/models/Contract';
import ContractItem from '../app/models/ContractItem';
import Material from '../app/models/Material';

const models = [Client, Material, Contract, ContractItem];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);

    models
      .map(model => model.init(this.connection))
      .map(model => model.associate && model.associate(this.connection.models));
  }
}

export default new Database();
