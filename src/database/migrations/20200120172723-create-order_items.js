const Sequelize = require('sequelize');

module.exports = {
  up: queryInterface => {
    return queryInterface.createTable('order_items', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      order_id: {
        type: Sequelize.INTEGER,
        references: { model: 'orders', key: 'id' },
        allowNull: false,
        onUpdate: 'NO ACTION',
        onDelete: 'NO ACTION',
      },
      material_id: {
        type: Sequelize.INTEGER,
        references: { model: 'materials', key: 'id' },
        allowNull: false,
        onUpdate: 'NO ACTION',
        onDelete: 'NO ACTION',
      },
      quantity: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      price_quantity_day: {
        type: Sequelize.DOUBLE,
        allowNull: true,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  down: queryInterface => {
    return queryInterface.dropTable('order_items');
  },
};
