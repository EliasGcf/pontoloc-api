import request from 'supertest';
import { Connection, getRepository, getConnection } from 'typeorm';
import { runSeeder } from 'typeorm-seeding';

import Client from '../../src/models/Client';
import UserAdminSeed from '../../src/database/seeds/UserAdmin.seed';
import createConnection from '../../src/database';
import getToken from '../utils/getTokenJWT';

import app from '../../src/app';

let connection: Connection;

describe('Client', () => {
  beforeAll(async () => {
    connection = await createConnection('test-connection');
    await connection.runMigrations();
    await runSeeder(UserAdminSeed);
  });

  afterEach(async () => {
    // await connection.query('DELETE FROM contract_items');
    // await connection.query('DELETE FROM contracts');
    // await connection.query('DELETE FROM materials');
    await connection.query('DELETE FROM clients');
  });

  afterAll(async () => {
    await connection.query('DELETE FROM users');
    const mainConnection = getConnection();

    await connection.close();
    await mainConnection.close();
  });

  describe('Create', () => {
    it('should be able to create a new client', async () => {
      const token = await getToken();

      const clientsRepository = getRepository(Client);

      const response = await request(app)
        .post('/clients')
        .send({
          name: 'Elias Gabriel',
          cpf: '761.436.350-72',
          phone_number: '71982740661',
          address: 'Rua Manoel Camillo de Almeida, Alto Sobradinho, 108',
        })
        .set('Authorization', `Bearer ${token}`);

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

    it('should not be able to create a new client with CPF duplicated', async () => {
      const token = await getToken();
      const clientsRepository = getRepository(Client);

      await request(app)
        .post('/clients')
        .send({
          name: 'Elias Gabriel',
          cpf: '761.436.350-72',
          phone_number: '71982740661',
          address: 'Rua Manoel Camillo de Almeida, Alto Sobradinho, 108',
        })
        .set('Authorization', `Bearer ${token}`);

      const response = await request(app)
        .post('/clients')
        .send({
          name: 'Patricia',
          cpf: '761.436.350-72',
          phone_number: '71982723661',
          address: 'Rua Manoel Camillo de Almeida, Alto Sobradinho, 108',
        })
        .set('Authorization', `Bearer ${token}`);

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

    it('should not be able to create a new client when exists another client with the same CPF in soft delete', async () => {
      const token = await getToken();
      const clientsRepository = getRepository(Client);

      const { body: client } = await request(app)
        .post('/clients')
        .send({
          name: 'Elias Gabriel',
          cpf: '761.436.350-72',
          phone_number: '71982740661',
          address: 'Rua Manoel Camillo de Almeida, Alto Sobradinho, 108',
        })
        .set('Authorization', `Bearer ${token}`);

      await clientsRepository.softDelete(client.id);

      const response = await request(app)
        .post('/clients')
        .send({
          name: 'Patricia',
          cpf: '761.436.350-72',
          phone_number: '71982723661',
          address: 'Rua Manoel Camillo de Almeida, Alto Sobradinho, 108',
        })
        .set('Authorization', `Bearer ${token}`);

      const dbClient = await clientsRepository.find({
        where: { cpf: '761.436.350-72' },
        withDeleted: true,
      });

      expect(dbClient).toHaveLength(1);
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
      const token = await getToken();
      await request(app)
        .post('/clients')
        .send({
          name: 'Elias Gabriel',
          cpf: '761.436.350-72',
          phone_number: '71982740661',
          address: 'Rua Manoel Camillo de Almeida, Alto Sobradinho, 108',
        })
        .set('Authorization', `Bearer ${token}`);

      await request(app)
        .post('/clients')
        .send({
          name: 'Patricia',
          cpf: '892.357.545-34',
          phone_number: '92992979776',
          address: 'Rua Pancrácio Nobre, Planalto, 867',
        })
        .set('Authorization', `Bearer ${token}`);

      const response = await request(app)
        .get('/clients')
        .set('Authorization', `Bearer ${token}`);

      expect(response.body).toHaveLength(2);
    });

    it('should be able to list all clients in soft delete', async () => {
      const token = await getToken();
      const clientsRepository = getRepository(Client);

      await request(app)
        .post('/clients')
        .send({
          name: 'Gustavo',
          cpf: '761.426.350-72',
          phone_number: '71982740661',
          address: 'Rua Manoel Camillo de Almeida, Alto Sobradinho, 108',
        })
        .set('Authorization', `Bearer ${token}`);

      const { body: client1 } = await request(app)
        .post('/clients')
        .send({
          name: 'Elias Gabriel',
          cpf: '761.436.350-72',
          phone_number: '71982740661',
          address: 'Rua Manoel Camillo de Almeida, Alto Sobradinho, 108',
        })
        .set('Authorization', `Bearer ${token}`);

      const { body: client2 } = await request(app)
        .post('/clients')
        .send({
          name: 'Patricia',
          cpf: '892.357.545-34',
          phone_number: '92992979776',
          address: 'Rua Pancrácio Nobre, Planalto, 867',
        })
        .set('Authorization', `Bearer ${token}`);

      client1.deleted_at = new Date();
      client2.deleted_at = new Date();

      await clientsRepository.save([client1, client2]);

      const response = await request(app)
        .get('/clients')
        .query({ deleted: true })
        .set('Authorization', `Bearer ${token}`);

      expect(response.body).toHaveLength(2);
    });

    it('should be abtle to list one client', async () => {
      const token = await getToken();
      const { body: client } = await request(app)
        .post('/clients')
        .send({
          name: 'Elias Gabriel',
          cpf: '761.436.350-72',
          phone_number: '71982740661',
          address: 'Rua Manoel Camillo de Almeida, Alto Sobradinho, 108',
        })
        .set('Authorization', `Bearer ${token}`);

      const response = await request(app)
        .get(`/clients/${client.id}`)
        .set('Authorization', `Bearer ${token}`);

      expect(response.body).toMatchObject({
        name: 'Elias Gabriel',
        cpf: '761.436.350-72',
        phone_number: '71982740661',
        address: 'Rua Manoel Camillo de Almeida, Alto Sobradinho, 108',
      });
    });

    it('should not be able to list one client that does not exists', async () => {
      const token = await getToken();
      const response = await request(app)
        .get(`/clients/12e5c331-1091-405f-b4e1-949000125129`)
        .set('Authorization', `Bearer ${token}`);

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
      const token = await getToken();
      const clientsRepository = getRepository(Client);

      const { body: client } = await request(app)
        .post('/clients')
        .send({
          name: 'Elias Gabriel',
          cpf: '761.436.350-72',
          phone_number: '71982740661',
          address: 'Rua Manoel Camillo de Almeida, Alto Sobradinho, 108',
        })
        .set('Authorization', `Bearer ${token}`);

      const response = await request(app)
        .put(`/clients/${client.id}`)
        .send({
          name: 'Elias Gabriel Da Cruz Figueredo',
          cpf: '761.436.350-72',
          phone_number: '75982740661',
          address: 'Rua Manoel Camillo de Almeida, Alto Sobradinho, 108',
        })
        .set('Authorization', `Bearer ${token}`);

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
      const token = await getToken();
      const response = await request(app)
        .put(`/clients/12e5c331-1091-405f-b4e1-949000125129`)
        .send({
          name: 'Elias Gabriel Da Cruz Figueredo',
          cpf: '761.436.350-72',
          phone_number: '75982740661',
          address: 'Rua Manoel Camillo de Almeida, Alto Sobradinho, 108',
        })
        .set('Authorization', `Bearer ${token}`);

      expect(response.status).toBe(400);
      expect(response.body).toMatchObject(
        expect.objectContaining({
          status: 'error',
          message: 'Client does not exists',
        }),
      );
    });

    it('should not be able to update a client with an CPF existed', async () => {
      const token = await getToken();
      const clientsRepository = getRepository(Client);

      const { body: client } = await request(app)
        .post('/clients')
        .send({
          name: 'Elias Gabriel',
          cpf: '761.436.350-72',
          phone_number: '71982740661',
          address: 'Rua Manoel Camillo de Almeida, Alto Sobradinho, 108',
        })
        .set('Authorization', `Bearer ${token}`);

      await request(app)
        .post('/clients')
        .send({
          name: 'Elias Gabriel',
          cpf: '959.178.070-27',
          phone_number: '71982740661',
          address: 'Rua Manoel Camillo de Almeida, Alto Sobradinho, 108',
        })
        .set('Authorization', `Bearer ${token}`);

      const response = await request(app)
        .put(`/clients/${client.id}`)
        .send({
          name: 'Elias Gabriel Da Cruz Figueredo',
          cpf: '959.178.070-27',
          phone_number: '75982740661',
          address: 'Rua Manoel Camillo de Almeida, Alto Sobradinho, 108',
        })
        .set('Authorization', `Bearer ${token}`);

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

    it('should not be able to update a client when exists another client with the same CPF in soft delete', async () => {
      const token = await getToken();
      const clientsRepository = getRepository(Client);

      const { body: client } = await request(app)
        .post('/clients')
        .send({
          name: 'Elias Gabriel',
          cpf: '761.436.350-72',
          phone_number: '71982740661',
          address: 'Rua Manoel Camillo de Almeida, Alto Sobradinho, 108',
        })
        .set('Authorization', `Bearer ${token}`);

      const { body: softDeleteClient } = await request(app)
        .post('/clients')
        .send({
          name: 'Elias Gabriel',
          cpf: '959.178.070-27',
          phone_number: '71982740661',
          address: 'Rua Manoel Camillo de Almeida, Alto Sobradinho, 108',
        })
        .set('Authorization', `Bearer ${token}`);

      await clientsRepository.softDelete(softDeleteClient.id);

      const response = await request(app)
        .put(`/clients/${client.id}`)
        .send({
          name: 'Elias Gabriel Da Cruz Figueredo',
          cpf: '959.178.070-27',
          phone_number: '75982740661',
          address: 'Rua Manoel Camillo de Almeida, Alto Sobradinho, 108',
        })
        .set('Authorization', `Bearer ${token}`);

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

    it('should not be able to update a client in soft delete', async () => {
      const token = await getToken();
      const clientsRepository = getRepository(Client);

      const { body: client } = await request(app)
        .post('/clients')
        .send({
          name: 'Elias Gabriel',
          cpf: '761.436.350-72',
          phone_number: '71982740661',
          address: 'Rua Manoel Camillo de Almeida, Alto Sobradinho, 108',
        })
        .set('Authorization', `Bearer ${token}`);

      await clientsRepository.softDelete(client.id);

      const response = await request(app)
        .put(`/clients/${client.id}`)
        .send({
          name: 'Elias Gabriel Da Cruz Figueredo',
          cpf: '761.436.350-72',
          phone_number: '75982740661',
          address: 'Rua Manoel Camillo de Almeida, Alto Sobradinho, 108',
        })
        .set('Authorization', `Bearer ${token}`);

      expect(response.status).toBe(400);
      expect(response.body).toMatchObject(
        expect.objectContaining({
          status: 'error',
          message: 'Client does not exists',
        }),
      );
    });

    it('should not be able to update deleted_at field directly', async () => {
      const token = await getToken();
      const clientsRepository = getRepository(Client);

      const { body: client } = await request(app)
        .post('/clients')
        .send({
          name: 'Elias Gabriel',
          cpf: '761.436.350-72',
          phone_number: '71982740661',
          address: 'Rua Manoel Camillo de Almeida, Alto Sobradinho, 108',
        })
        .set('Authorization', `Bearer ${token}`);

      const response = await request(app)
        .put(`/clients/${client.id}`)
        .send({
          name: 'Elias Gabriel Da Cruz Figueredo',
          cpf: '761.436.350-72',
          phone_number: '75982740661',
          address: 'Rua Manoel Camillo de Almeida, Alto Sobradinho, 108',
          deleted_at: new Date(),
        })
        .set('Authorization', `Bearer ${token}`);

      const dbClient = await clientsRepository.findOne(client.id);

      expect(response.status).toBe(204);
      expect(dbClient).toMatchObject(
        expect.objectContaining({
          name: 'Elias Gabriel Da Cruz Figueredo',
          cpf: '761.436.350-72',
          phone_number: '75982740661',
          address: 'Rua Manoel Camillo de Almeida, Alto Sobradinho, 108',
          deleted_at: null,
        }),
      );
    });
  });

  describe('Delete', () => {
    it('should be able to delete a client and set deleted_at', async () => {
      const token = await getToken();
      const clientsRepository = getRepository(Client);

      const { body: client } = await request(app)
        .post('/clients')
        .send({
          name: 'Elias Gabriel',
          cpf: '761.436.350-72',
          phone_number: '71982740661',
          address: 'Rua Manoel Camillo de Almeida, Alto Sobradinho, 108',
        })
        .set('Authorization', `Bearer ${token}`);

      const response = await request(app)
        .delete(`/clients/${client.id}`)
        .set('Authorization', `Bearer ${token}`);

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
      const token = await getToken();

      const response = await request(app)
        .delete(`/clients/12e5c331-1091-405f-b4e1-949000125129`)
        .set('Authorization', `Bearer ${token}`);

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
