module.exports = {
  up: queryInterface => {
    return queryInterface.bulkInsert(
      'materials',
      [
        {
          name: 'Andaime',
          price_day: 1.5,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: 'Furadeira',
          price_day: 20,
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  down: () => {},
};
