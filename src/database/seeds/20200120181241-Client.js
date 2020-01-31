module.exports = {
  up: queryInterface => {
    return queryInterface.bulkInsert(
      'clients',
      [
        {
          name: 'Elias Gabriel da Cruz Figueredo',
          cpf: '436.548.410-90',
          telefone: '(21) 9 2874-8023',
          endereco: 'Rua Ângelo Amboni, 336, Centro, Criciúma',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: 'Gustavo da Cruz Figueredo',
          cpf: '343.952.110-97',
          telefone: '(21) 9 9277-2609',
          endereco: 'Beco do Lazer, 419, Jacaré, Rio de Janeiro',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: 'Elias Figueredo dos Santos',
          cpf: '561.636.260-36',
          telefone: '(69) 9 9773-6928',
          endereco: 'Rua Mato Grosso, 108',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: 'Patricia Silva da Cruz Figueredo',
          cpf: '163.313.930-13',
          telefone: '(82) 9 8774-5831',
          endereco: 'Rua Presidente Tyler, 878, Setor Garavelo, Goiânia',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: 'Kaique Figueredo Merces de Oliveira',
          cpf: '502.974.940-31',
          telefone: '(79) 9 8857-4821',
          endereco: 'Rua Rio Negro, 414, Floresta, Cacoal',
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  down: () => {},
};
