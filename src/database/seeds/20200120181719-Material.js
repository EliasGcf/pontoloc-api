module.exports = {
  up: queryInterface => {
    return queryInterface.bulkInsert(
      'materials',
      [
        {
          name: 'Andaime',
          price_day: 0.25,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: 'Escora',
          price_day: 0.15,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: 'Roudana',
          price_day: 0.4,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: 'Plataforma',
          price_day: 0.2,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: 'Betoneira',
          price_day: 50,
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  down: () => {},
};
