module.exports = {
  up: queryInterface => {
    return queryInterface.bulkInsert(
      'clients',
      [
        {
          name: 'Elias Gabriel da Cruz Figueredo',
          cpf: '111.111.111-11',
          telefone: '75988718720',
          endereco: 'Rua Mato Grosso, 108',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: 'Gustavo da Cruz Figueredo',
          cpf: '111.111.111-12',
          telefone: '75988718720',
          endereco: 'Rua Mato Grosso, 108',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: 'Elias Figueredo dos Santos',
          cpf: '111.111.111-13',
          telefone: '75988718720',
          endereco: 'Rua Mato Grosso, 108',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: 'Patricia Silva da Cruz Figueredo',
          cpf: '111.111.111-14',
          telefone: '75988718720',
          endereco: 'Rua Mato Grosso, 108',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: 'Kaique Figueredo Merces de Oliveira',
          cpf: '111.111.111-15',
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
