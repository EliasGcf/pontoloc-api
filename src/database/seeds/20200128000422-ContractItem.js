module.exports = {
  up: queryInterface => {
    return queryInterface.bulkInsert(
      'contract_items',
      [
        {
          contract_id: 1,
          material_id: 1,
          quantity: 25,
          price_quantity_day: 6.25,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          contract_id: 1,
          material_id: 2,
          quantity: 50,
          price_quantity_day: 7.5,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          contract_id: 1,
          material_id: 3,
          quantity: 8,
          price_quantity_day: 3.2,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          contract_id: 2,
          material_id: 5,
          quantity: 2,
          price_quantity_day: 100,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          contract_id: 3,
          material_id: 1,
          quantity: 50,
          price_quantity_day: 12.5,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          contract_id: 3,
          material_id: 4,
          quantity: 10,
          price_quantity_day: 2,
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  down: () => {},
};
