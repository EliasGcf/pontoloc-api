import Sequelize from 'sequelize';

import databaseConfig from '../config/database';

import Client from '../app/models/Client';
import Material from '../app/models/Material';
import Order from '../app/models/Order';
import OrderItems from '../app/models/OrderItem';

const models = [Client, Material, Order, OrderItems];

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
