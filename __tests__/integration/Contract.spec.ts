import request from 'supertest';
import { Connection, getRepository, getConnection } from 'typeorm';
import { runSeeder } from 'typeorm-seeding';

import Material from '../../src/models/Material';
import Contract from '../../src/models/Contract';
import Client from '../../src/models/Client';
import UserAdminSeed from '../../src/database/seeds/UserAdmin.seed';
import createConnection from '../../src/database';
import getToken from '../utils/getTokenJWT';

import app from '../../src/app';

let connection: Connection;

describe('Contract', () => {
  beforeAll(async () => {
    connection = await createConnection('test-connection');
    await connection.runMigrations();
    await runSeeder(UserAdminSeed);
  });

  afterEach(async () => {
    await connection.query('DELETE FROM contracts');
    await connection.query('DELETE FROM clients');
    await connection.query('DELETE FROM materials');
  });

  afterAll(async () => {
    await connection.query('DELETE FROM users');
    const mainConnection = getConnection();

    await connection.close();
    await mainConnection.close();
  });

  describe('Create', () => {
    it('should be able to create a new contract', async () => {
      const token = await getToken();

      const clientsRepository = getRepository(Client);
      const contractsRepository = getRepository(Contract);
      const materialsRepository = getRepository(Material);

      const material = materialsRepository.create({
        name: 'Estronca',
        daily_price: 1.4,
      });

      const client = clientsRepository.create({
        name: 'Elias Gabriel',
        cpf: '761.436.350-72',
        phone_number: '71982740661',
        address: 'Rua Manoel Camillo de Almeida, Alto Sobradinho, 108',
      });

      const [{ id: material_id }, { id: client_id }] = await Promise.all([
        materialsRepository.save(material),
        clientsRepository.save(client),
      ]);

      const response = await request(app)
        .post('/contracts')
        .send({
          client_id,
          materials: [{ id: material_id, quantity: 2 }],
        })
        .set('Authorization', `Bearer ${token}`);

      const contract = await contractsRepository.findOne({
        where: { client_id },
      });

      expect(contract).toBeTruthy();
      expect(response.status).toBe(201);
      expect(response.body).toMatchObject(
        expect.objectContaining({
          id: contract?.id,
          daily_total_price: expect.any(Number),
        }),
      );
    });

    it('should not be able to craete a new contract for a client does not exists', async () => {
      const token = await getToken();

      const materialsRepository = getRepository(Material);

      const material = materialsRepository.create({
        name: 'Estronca',
        daily_price: 1.4,
      });

      const { id: material_id } = await materialsRepository.save(material);

      const response = await request(app)
        .post('/contracts')
        .send({
          client_id: 'a820031c-ecaf-4e55-b8f7-11e5a2664f74',
          materials: [{ id: material_id, quantity: 2 }],
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

    it('should not be able to create a new contract without materais', async () => {
      const token = await getToken();

      const clientsRepository = getRepository(Client);

      const client = clientsRepository.create({
        name: 'Elias Gabriel',
        cpf: '761.436.350-72',
        phone_number: '71982740661',
        address: 'Rua Manoel Camillo de Almeida, Alto Sobradinho, 108',
      });

      await clientsRepository.save(client);

      const response = await request(app)
        .post('/contracts')
        .send({
          client_id: client.id,
        })
        .set('Authorization', `Bearer ${token}`);

      expect(response.status).toBe(400);
      expect(response.body).toMatchObject(
        expect.objectContaining({
          status: 'error',
          message: 'Materials array is required',
        }),
      );
    });
  });
});
