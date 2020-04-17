- [ ] Não deve ser possivel realizar uma requisição sem estar autenticado, exceto rota de login

- Cliente
  - [x] Deve ser possivel criar um registro
  - [x] Não deve ser possivel ter registros duplicados pelo CPF, incluindo os inativos
  ---
  - [x] Deve ser possivel listar todos os registros
  - [x] Deve ser possivel listar todos os registros em soft delete
  - [x] Deve ser possivel listar apenas um registro
  - [x] Não deve ser possivel listar um cliente que não existe
  ---
  - [x] Deve ser possivel atualizar um registro
  - [x] Não deve ser possivel atualizar um client que não existe
  - [x] Não deve ser possivel atualizar um registro e por um CPF ja existente, incluindo os inativos
  - [x] Não deve ser possivel atualizar um registro em soft delete
  - [x] Não deve ser possivel atualizar o campo `deleted_at`
  ---
  - [x] Deve ser possivel inativar um registro
  - [x] Não deve ser possivel inativar um cliente que não existe

<br />

- Session
  - [x] Deve ser possivel criar uma sessão
  - [x] Não deve ser possivel criar uma sessão com dados invalidos

<br />

- Material
  - [ ] Deve ser possivel criar um registro
  - [ ] Não deve ser possivel ter registros duplicados pelo nome
  - [ ] Deve ser possivel listar todos os registros
  - [ ] Deve ser possivel atualizar um registro
  - [ ] Não deve ser possivel atualizar um registro e por um Nome ja existente

- Contratos
  - [ ] Deve ser possivel criar um registro
  - [ ] Não deve ser possivel criar um registro para um cliente inexistente
