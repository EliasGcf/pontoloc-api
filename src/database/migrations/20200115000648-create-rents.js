const Sequelize = require('sequelize');

module.exports = {
  up: queryInterface => {
    return queryInterface.createTable('rents', {
      // client_id, material_id, returned_at, amount, price
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      client_id: {
        type: Sequelize.INTEGER,
        references: { model: 'clients', key: 'id' },
        allowNull: false,
        onUpdate: 'CASCADE',
        onDelete: 'NO ACTION',
      },
      item_id: {
        type: Sequelize.INTEGER,
        references: { model: 'items', key: 'id' },
        allowNull: false,
        onUpdate: 'CASCADE',
        onDelete: 'NO ACTION',
      },
      amount: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      rent_price: {
        type: Sequelize.DOUBLE,
        allowNull: false,
      },
      returned_at: {
        type: Sequelize.DATE,
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
    return queryInterface.dropTable('rents');
  },
};
