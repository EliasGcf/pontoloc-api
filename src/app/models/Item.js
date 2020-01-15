import Sequelize, { Model } from 'sequelize';

class Item extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        price: Sequelize.DOUBLE,
      },
      {
        sequelize,
      }
    );

    return this;
  }
}

export default Item;
