import Sequelize from 'sequelize';

import databaseConfig from '../config/database';

import Client from '../app/models/Client';
import Item from '../app/models/Item';
import Rent from '../app/models/Rent';

const models = [Client, Item, Rent];

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
