import request from 'supertest';
import { Connection, getRepository, getConnection } from 'typeorm';
import { runSeeder } from 'typeorm-seeding';

import Material from '../../src/models/Material';
import UserAdminSeed from '../../src/database/seeds/UserAdmin.seed';
import createConnection from '../../src/database';
import getToken from '../utils/getTokenJWT';

import app from '../../src/app';

let connection: Connection;

describe('Material', () => {
  beforeAll(async () => {
    connection = await createConnection('test-connection');
    await connection.runMigrations();
    await runSeeder(UserAdminSeed);
  });

  afterEach(async () => {
    // await connection.query('DELETE FROM contract_items');
    // await connection.query('DELETE FROM contracts');
    await connection.query('DELETE FROM materials');
    // await connection.query('DELETE FROM clients');
  });

  afterAll(async () => {
    await connection.query('DELETE FROM users');
    const mainConnection = getConnection();

    await connection.close();
    await mainConnection.close();
  });

  describe('Create', () => {
    it('should be able to create a new material', async () => {
      const token = await getToken();

      const materialsRepository = getRepository(Material);

      const response = await request(app)
        .post('/materials')
        .send({
          name: 'Andaime',
          daily_price: 1.2,
        })
        .set('Authorization', `Bearer ${token}`);

      const material = await materialsRepository.findOne({
        where: { name: 'andaime' },
      });

      expect(material).toBeTruthy();

      expect(response.status).toBe(201);
      expect(response.body).toMatchObject(
        expect.objectContaining({
          id: expect.any(String),
          name: 'andaime',
          daily_price: 1.2,
        }),
      );
    });

    it('should not be able to create a new material with duplicated name', async () => {
      const token = await getToken();

      const materialsRepository = getRepository(Material);

      await request(app)
        .post('/materials')
        .send({
          name: 'Andaime',
          daily_price: 1.2,
        })
        .set('Authorization', `Bearer ${token}`);

      const response = await request(app)
        .post('/materials')
        .send({
          name: 'Andaime',
          daily_price: 1.2,
        })
        .set('Authorization', `Bearer ${token}`);

      const materials = await materialsRepository.find({
        where: { name: 'andaime' },
      });

      expect(materials).toHaveLength(1);
      expect(response.status).toBe(400);
      expect(response.body).toMatchObject(
        expect.objectContaining({
          status: expect.stringMatching('error'),
          message: expect.stringMatching('Material already exists'),
        }),
      );
    });
  });

  describe('List', () => {
    it('should be able to list all materials', async () => {
      const token = await getToken();

      await request(app)
        .post('/materials')
        .send({
          name: 'Andaime',
          daily_price: 1.2,
        })
        .set('Authorization', `Bearer ${token}`);

      await request(app)
        .post('/materials')
        .send({
          name: 'Estronca',
          daily_price: 1.2,
        })
        .set('Authorization', `Bearer ${token}`);

      const response = await request(app)
        .get('/materials')
        .set('Authorization', `Bearer ${token}`);

      expect(response.body).toHaveLength(2);
    });

    it('should be able to list one material', async () => {
      const token = await getToken();

      const { body: material } = await request(app)
        .post('/materials')
        .send({
          name: 'Andaime',
          daily_price: 1.2,
        })
        .set('Authorization', `Bearer ${token}`);

      const response = await request(app)
        .get(`/materials/${material.id}`)
        .set('Authorization', `Bearer ${token}`);

      expect(response.body).toMatchObject({
        name: 'andaime',
        daily_price: 1.2,
      });
    });

    it('should not be able to list one material that does not exists', async () => {
      const token = await getToken();
      const response = await request(app)
        .get('/materials/12e5c331-1091-405f-b4e1-949000125129')
        .set('Authorization', `Bearer ${token}`);

      expect(response.status).toBe(400);
      expect(response.body).toMatchObject(
        expect.objectContaining({
          status: 'error',
          message: 'Material does not exists',
        }),
      );
    });
  });

  describe('Update', () => {
    it('should be able to update daily_price field for one material by an id', async () => {
      const token = await getToken();
      const materialsRepository = getRepository(Material);

      const { body: material } = await request(app)
        .post('/materials')
        .send({
          name: 'Andaime',
          daily_price: 1.2,
        })
        .set('Authorization', `Bearer ${token}`);

      const response = await request(app)
        .put(`/materials/${material.id}`)
        .send({
          name: 'QUALQUER COISA',
          daily_price: 1.5,
        })
        .set('Authorization', `Bearer ${token}`);

      const dbMaterial = await materialsRepository.findOne(material.id);

      expect(response.status).toBe(204);
      expect(dbMaterial).toMatchObject({
        name: 'andaime',
        daily_price: 1.5,
      });
    });

    it('should not be able to update a material that does not exists', async () => {
      const token = await getToken();

      const response = await request(app)
        .put('/materials/12e5c331-1091-405f-b4e1-949000125129')
        .send({
          name: 'QUALQUER COISA',
          daily_price: 1.5,
        })
        .set('Authorization', `Bearer ${token}`);

      expect(response.status).toBe(400);
      expect(response.body).toMatchObject(
        expect.objectContaining({
          status: 'error',
          message: 'Material does not exists',
        }),
      );
    });
  });
});
