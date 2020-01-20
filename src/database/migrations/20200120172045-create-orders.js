const Sequelize = require('sequelize');

module.exports = {
  up: queryInterface => {
    return queryInterface.createTable('orders', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      client_id: {
        type: Sequelize.INTEGER,
        references: { model: 'clients', key: 'id' },
        allowNull: false,
        onUpdate: 'NO ACTION',
        onDelete: 'NO ACTION',
      },
      price_total_day: {
        type: Sequelize.DOUBLE,
        allowNull: true,
      },
      returned_at: {
        type: Sequelize.DATE,
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
    return queryInterface.dropTable('orders');
  },
};
