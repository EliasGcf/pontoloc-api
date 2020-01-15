import Sequelize, { Model } from 'sequelize';

class Rent extends Model {
  static init(sequelize) {
    super.init(
      {
        amount: Sequelize.INTEGER,
        rent_price: Sequelize.DOUBLE,
        returned_at: Sequelize.DATE,
      },
      {
        sequelize,
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.Client, { foreignKey: 'client_id', as: 'client' });
    this.belongsTo(models.Item, { foreignKey: 'item_id', as: 'item' });
  }
}

export default Rent;
