import request from 'supertest';
import { Connection, getRepository, getConnection } from 'typeorm';

import Client from '../../src/models/Client';
import createConnection from '../../src/database';

import app from '../../src/app';

let connection: Connection;

describe('Client', () => {
  beforeAll(async () => {
    connection = await createConnection('test-connection');
    await connection.runMigrations();
  });

  afterEach(async () => {
    // await connection.query('DELETE FROM contract_items');
    // await connection.query('DELETE FROM contracts');
    // await connection.query('DELETE FROM materials');
    await connection.query('DELETE FROM clients');
  });

  afterAll(async () => {
    const mainConnection = getConnection();

    await connection.close();
    await mainConnection.close();
  });

  describe('Create', () => {
    it('should be able to create a new client', async () => {
      const clientsRepository = getRepository(Client);

      const response = await request(app).post('/clients').send({
        name: 'Elias Gabriel',
        cpf: '761.436.350-72',
        phone_number: '71982740661',
        address: 'Rua Manoel Camillo de Almeida, Alto Sobradinho, 108',
      });

      const client = await clientsRepository.findOne({
        where: { cpf: '761.436.350-72' },
      });

      expect(client).toBeTruthy();

      expect(response.status).toBe(201);
      expect(response.body).toMatchObject(
        expect.objectContaining({
          id: expect.any(String),
        }),
      );
    });

    it('should not be able to create with CPF duplicated', async () => {
      const clientsRepository = getRepository(Client);

      await request(app).post('/clients').send({
        name: 'Elias Gabriel',
        cpf: '761.436.350-72',
        phone_number: '71982740661',
        address: 'Rua Manoel Camillo de Almeida, Alto Sobradinho, 108',
      });

      const response = await request(app).post('/clients').send({
        name: 'Patricia',
        cpf: '761.436.350-72',
        phone_number: '71982723661',
        address: 'Rua Manoel Camillo de Almeida, Alto Sobradinho, 108',
      });

      const client = await clientsRepository.find({
        where: { cpf: '761.436.350-72' },
      });

      expect(client).toHaveLength(1);
      expect(response.status).toBe(400);
      expect(response.body).toMatchObject(
        expect.objectContaining({
          status: expect.stringMatching('error'),
          message: expect.stringMatching('Client already exists'),
        }),
      );
    });
  });

  describe('List', () => {
    it('should be able to list all clients', async () => {
      await request(app).post('/clients').send({
        name: 'Elias Gabriel',
        cpf: '761.436.350-72',
        phone_number: '71982740661',
        address: 'Rua Manoel Camillo de Almeida, Alto Sobradinho, 108',
      });

      await request(app).post('/clients').send({
        name: 'Patricia',
        cpf: '892.357.545-34',
        phone_number: '92992979776',
        address: 'Rua Pancrácio Nobre, Planalto, 867',
      });

      const response = await request(app).get('/clients');

      expect(response.body).toHaveLength(2);
    });

    it('should be abtle to list one client', async () => {
      const { body: client } = await request(app).post('/clients').send({
        name: 'Elias Gabriel',
        cpf: '761.436.350-72',
        phone_number: '71982740661',
        address: 'Rua Manoel Camillo de Almeida, Alto Sobradinho, 108',
      });

      const response = await request(app).get(`/clients/${client.id}`);

      expect(response.body).toMatchObject({
        name: 'Elias Gabriel',
        cpf: '761.436.350-72',
        phone_number: '71982740661',
        address: 'Rua Manoel Camillo de Almeida, Alto Sobradinho, 108',
      });
    });

    it('should not be able to list one client that does not exists', async () => {
      const response = await request(app).get(
        `/clients/12e5c331-1091-405f-b4e1-949000125129`,
      );

      expect(response.status).toBe(400);
      expect(response.body).toMatchObject(
        expect.objectContaining({
          status: 'error',
          message: 'Client does not exists',
        }),
      );
    });
  });

  describe('Update', () => {
    it('should be able to update a client by an id', async () => {
      const clientsRepository = getRepository(Client);

      const { body: client } = await request(app).post('/clients').send({
        name: 'Elias Gabriel',
        cpf: '761.436.350-72',
        phone_number: '71982740661',
        address: 'Rua Manoel Camillo de Almeida, Alto Sobradinho, 108',
      });

      const response = await request(app).put(`/clients/${client.id}`).send({
        name: 'Elias Gabriel Da Cruz Figueredo',
        cpf: '761.436.350-72',
        phone_number: '75982740661',
        address: 'Rua Manoel Camillo de Almeida, Alto Sobradinho, 108',
      });

      const dbClient = await clientsRepository.findOne(client.id);

      expect(response.status).toBe(204);
      expect(dbClient).toMatchObject({
        name: 'Elias Gabriel Da Cruz Figueredo',
        cpf: '761.436.350-72',
        phone_number: '75982740661',
        address: 'Rua Manoel Camillo de Almeida, Alto Sobradinho, 108',
      });
    });

    it('should not be able to update a client that does not exists', async () => {
      const response = await request(app)
        .put(`/clients/12e5c331-1091-405f-b4e1-949000125129`)
        .send({
          name: 'Elias Gabriel Da Cruz Figueredo',
          cpf: '761.436.350-72',
          phone_number: '75982740661',
          address: 'Rua Manoel Camillo de Almeida, Alto Sobradinho, 108',
        });

      expect(response.status).toBe(400);
      expect(response.body).toMatchObject(
        expect.objectContaining({
          status: 'error',
          message: 'Client does not exists',
        }),
      );
    });

    it('should not be able to update a client with an CPF existed', async () => {
      const clientsRepository = getRepository(Client);

      const { body: client } = await request(app).post('/clients').send({
        name: 'Elias Gabriel',
        cpf: '761.436.350-72',
        phone_number: '71982740661',
        address: 'Rua Manoel Camillo de Almeida, Alto Sobradinho, 108',
      });

      await request(app).post('/clients').send({
        name: 'Elias Gabriel',
        cpf: '959.178.070-27',
        phone_number: '71982740661',
        address: 'Rua Manoel Camillo de Almeida, Alto Sobradinho, 108',
      });

      const response = await request(app).put(`/clients/${client.id}`).send({
        name: 'Elias Gabriel Da Cruz Figueredo',
        cpf: '959.178.070-27',
        phone_number: '75982740661',
        address: 'Rua Manoel Camillo de Almeida, Alto Sobradinho, 108',
      });

      const dbClient = await clientsRepository.findOne(client.id);

      expect(dbClient?.cpf).toBe('761.436.350-72');
      expect(response.status).toBe(400);
      expect(response.body).toMatchObject(
        expect.objectContaining({
          status: 'error',
          message: 'Client already exists',
        }),
      );
    });
  });

  describe('Delete', () => {
    it('should be able to delete a client and set deleted_at', async () => {
      const clientsRepository = getRepository(Client);

      const { body: client } = await request(app).post('/clients').send({
        name: 'Elias Gabriel',
        cpf: '761.436.350-72',
        phone_number: '71982740661',
        address: 'Rua Manoel Camillo de Almeida, Alto Sobradinho, 108',
      });

      const response = await request(app).delete(`/clients/${client.id}`);

      const dbClient = await clientsRepository.findOne({
        where: {
          id: client.id,
        },
        withDeleted: true,
      });

      expect(response.status).toBe(200);
      expect(dbClient?.deleted_at).toBeTruthy();
    });

    it('should not be able to delete a client that does not exists', async () => {
      const response = await request(app).delete(
        `/clients/12e5c331-1091-405f-b4e1-949000125129`,
      );

      expect(response.status).toBe(400);
      expect(response.body).toMatchObject(
        expect.objectContaining({
          status: 'error',
          message: 'Client does not exists',
        }),
      );
    });
  });
});
