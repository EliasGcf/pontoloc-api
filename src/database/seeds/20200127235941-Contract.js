module.exports = {
  up: queryInterface => {
    return queryInterface.bulkInsert(
      'contracts',
      [
        {
          client_id: 1,
          price_total_day: 16.95,
          delivery_price: 0,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          client_id: 2,
          price_total_day: 100,
          delivery_price: 40,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          client_id: 4,
          price_total_day: 14.5,
          delivery_price: 0,
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  down: () => {},
};
