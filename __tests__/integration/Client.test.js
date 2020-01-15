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
      const client = await factory.attrs('Client', { cpf: '111.111.111-11' });

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
  });

  describe('Update', () => {
    it('should not be able to edit a client that does not exist', async () => {
      const client = await factory.attrs('Client', { cpf: '111.111.111-11' });

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

    it('should be able to edit a client with a database id', async () => {
      const client = await factory.attrs('Client', { cpf: '111.111.111-11' });

      const response = await request(app)
        .post('/clients')
        .send(client);

      const clientEdit = await factory.attrs('Client', {
        cpf: '000.000.000-00',
      });

      const editClient = await request(app)
        .put(`/clients/${response.body.id}`)
        .send(clientEdit);

      expect(editClient.status).toBe(200);
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
  });

  describe('List', () => {
    it('it should be able to have a customer list', async () => {
      const firstClient = await factory.attrs('Client', {
        cpf: '111.111.111-11',
      });

      await request(app)
        .post('/clients')
        .send(firstClient);

      const secondClient = await factory.attrs('Client', {
        cpf: '222.222.222-22',
      });

      await request(app)
        .post('/clients')
        .send(secondClient);

      const response = await request(app).get('/clients');

      expect(response.body).toHaveLength(2);
    });
  });

  describe('Destroy', () => {
    it('should be able to delete a client who has no rent, even the rent has already been returned', async () => {
      const client = await factory.attrs('Client', { cpf: '111.111.111-11' });

      const creatResponse = await request(app)
        .post('/clients')
        .send(client);

      const deleteResponse = await request(app).delete(
        `/clients/${creatResponse.body.id}`
      );
      expect(deleteResponse.status).toBe(200);
    });

    it('should be not able to delete a client who does not exists', async () => {
      const deleteResponse = await request(app).delete('/clients/1');
      expect(deleteResponse.status).toBe(400);
    });

    it('should not be able to delete a client who has a rent register', async () => {
      const client = await factory.attrs('Client', { cpf: '111.111.111-11' });
      const item = await factory.attrs('Item');

      const creatClientResponse = await request(app) // cria um client
        .post('/clients')
        .send(client);

      const creatItemResponse = await request(app) // cria um item
        .post('/items')
        .send(item);

      const rent = await factory.attrs('Rent', {
        client_id: creatClientResponse.body.id,
        item_id: creatItemResponse.body.id,
      });

      await request(app) // cria rent
        .post('/rents')
        .send(rent);

      const deleteClientResponse = await request(app).delete(
        `/clients/${creatClientResponse.body.id}`
      );

      expect(deleteClientResponse.status).toBe(400);
    });
  });
});
