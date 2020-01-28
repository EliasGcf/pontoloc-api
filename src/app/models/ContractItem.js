import Sequelize, { Model } from 'sequelize';

import Material from './Material';

class ContractItem extends Model {
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
      const material = await Material.findByPk(orderItem.material_id);

      orderItem.price_quantity_day = material.price_day * orderItem.quantity;
    });

    return this;
  }

  static associate(models) {
    this.belongsTo(models.Contract, {
      foreignKey: 'contract_id',
      as: 'contract',
    });
    this.belongsTo(models.Material, {
      foreignKey: 'material_id',
      as: 'material',
    });
  }
}

export default ContractItem;
