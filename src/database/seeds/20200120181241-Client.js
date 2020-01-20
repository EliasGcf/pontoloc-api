module.exports = {
  up: queryInterface => {
    return queryInterface.bulkInsert(
      'clients',
      [
        {
          name: 'Elias Gabriel',
          cpf: '111.111.111-11',
          telefone: '75988718720',
          endereco: 'Rua Mato Grosso, 108',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: 'Gustavo Figueredo',
          cpf: '111.111.111-12',
          telefone: '75988718720',
          endereco: 'Rua Mato Grosso, 108',
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  down: () => {},
};
