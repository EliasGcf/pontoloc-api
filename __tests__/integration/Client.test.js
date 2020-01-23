import request from 'supertest';

import app from '../../src/app';
import factory from '../factories';
import truncate from '../util/truncate';

describe('Client', () => {
  beforeEach(async () => {
    await truncate();
  });

  describe('Create', () => {
    it('should be able to register a client', async () => {
      const client = await factory.attrs('Client');

      const response = await request(app)
        .post('/clients')
        .send(client);

      expect(response.body).toHaveProperty('id');
    });

    it('should not be able to register with duplicated CPF', async () => {
      const client = await factory.attrs('Client', { cpf: '111.111.111-11' });

      await request(app)
        .post('/clients')
        .send(client);

      const response = await request(app)
        .post('/clients')
        .send(client);

      expect(response.status).toBe(400);
    });

    it('should not be able to register a client with invalid data', async () => {
      const { name, telefone, endereco } = await factory.attrs('Client');

      const response = await request(app)
        .post('/clients')
        .send({ name, telefone, endereco });

      expect(response.status).toBe(400);
    });
  });

  describe('Update', () => {
    it('should be able to edit a client with a database id', async () => {
      const client = await factory.attrs('Client');

      const response = await request(app)
        .post('/clients')
        .send(client);

      const clientEdit = await factory.attrs('Client');

      const editClient = await request(app)
        .put(`/clients/${response.body.id}`)
        .send(clientEdit);

      expect(editClient.status).toBe(200);
    });

    it('should not be able to edit a client that does not exist', async () => {
      const client = await factory.attrs('Client');

      const response = await request(app)
        .post('/clients')
        .send(client);

      const editClient = await request(app)
        .put(`/clients/${response.body.id + 1}`)
        .send(client);

      expect(editClient.body).toStrictEqual({
        error: 'Client does not exists',
      });
    });

    it('should not be able to edit a client with a CPF already used', async () => {
      let client = await factory.attrs('Client', { cpf: '111.111.111-11' });

      await request(app)
        .post('/clients')
        .send(client);

      client = await factory.attrs('Client', { cpf: '222.222.222-22' });

      const response = await request(app)
        .post('/clients')
        .send(client);

      const clientEdit = await factory.attrs('Client', {
        cpf: '111.111.111-11',
      });

      const editClient = await request(app)
        .put(`/clients/${response.body.id}`)
        .send(clientEdit);

      expect(editClient.status).toBe(400);
    });

    it('should not be able to edit a client with invalid data', async () => {
      const client = await factory.attrs('Client');

      const response = await request(app)
        .post('/clients')
        .send(client);

      const { name, endereco, cpf } = await factory.attrs('Client');

      const editClient = await request(app)
        .put(`/clients/${response.body.id}`)
        .send({ name, endereco, cpf });

      expect(editClient.status).toBe(400);
    });
  });

  describe('List', () => {
    it('it should be able to have a customer list', async () => {
      const [client1, client2] = await factory.attrsMany('Client', 2);

      await request(app)
        .post('/clients')
        .send(client1);

      await request(app)
        .post('/clients')
        .send(client2);

      const response = await request(app).get('/clients');

      expect(response.body).toEqual([
        expect.objectContaining({
          name: client1.name,
          telefone: client1.telefone,
          cpf: client1.cpf,
          endereco: client1.endereco,
        }),
        expect.objectContaining({
          name: client2.name,
          telefone: client2.telefone,
          cpf: client2.cpf,
          endereco: client2.endereco,
        }),
      ]);
    });
  });

  describe('Destroy', () => {
    it('should be able to delete a client who has no rent, even the rent has already been returned', async () => {
      const client = await factory.attrs('Client');

      const creatResponse = await request(app)
        .post('/clients')
        .send(client);

      const deleteResponse = await request(app).delete(
        `/clients/${creatResponse.body.id}`
      );
      expect(deleteResponse.status).toBe(200);
    });

    it('should not be able to delete a client who does not exists', async () => {
      const deleteResponse = await request(app).delete('/clients/1');
      expect(deleteResponse.status).toBe(400);
    });

    it('should not be able to delete a client who has a rent register', async () => {
      const client = await factory.attrs('Client');

      const response = await request(app) // cria um client
        .post('/clients')
        .send(client);

      await request(app) // cria contract
        .post('/contracts')
        .send({ client_id: response.body.id });

      const deleteResponse = await request(app).delete(
        `/clients/${response.body.id}`
      );

      expect(deleteResponse.status).toBe(400);
    });
  });
});
