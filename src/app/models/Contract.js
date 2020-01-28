import Sequelize, { Model } from 'sequelize';

class Contract extends Model {
  static init(sequelize) {
    super.init(
      {
        price_total_day: Sequelize.DOUBLE,
        returned_at: Sequelize.DATE,
        delivery_price: Sequelize.DOUBLE,
        collet_price: Sequelize.DOUBLE,
      },
      {
        sequelize,
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.Client, { foreignKey: 'client_id', as: 'client' });
  }
}

export default Contract;
