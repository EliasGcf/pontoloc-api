import Sequelize, { Model } from 'sequelize';

import Material from './Material';

class OrderItems extends Model {
  static init(sequelize) {
    super.init(
      {
        quantity: Sequelize.INTEGER,
        price_quantity_day: Sequelize.DOUBLE,
      },
      {
        sequelize,
      }
    );

    this.addHook('beforeSave', async orderItem => {
      if (orderItem.quantity) {
        const material = await Material.findByPk(orderItem.material_id);

        orderItem.price_quantity_day = material.price_day * orderItem.quantity;
      }
    });

    return this;
  }

  static associate(models) {
    this.belongsTo(models.Order, { foreignKey: 'order_id', as: 'order' });
    this.belongsTo(models.Material, {
      foreignKey: 'material_id',
      as: 'material',
    });
  }
}

export default OrderItems;
