import request from 'supertest';
import { Connection, getConnection } from 'typeorm';
import { runSeeder } from 'typeorm-seeding';

import createConnection from '../../src/database';
import UserAdminSeed from '../../src/database/seeds/UserAdmin.seed';
import app from '../../src/app';

let connection: Connection;

describe('Authentication', () => {
  beforeAll(async () => {
    connection = await createConnection('test-connection');
    await connection.runMigrations();
    await runSeeder(UserAdminSeed);
  });

  afterAll(async () => {
    await connection.query('DELETE FROM users');
    const mainConnection = getConnection();

    await connection.close();
    await mainConnection.close();
  });

  it('All routes must be authenticated', async () => {
    const clientsResponse = await request(app).get('/clients');

    expect(clientsResponse.status).toBe(401);
    expect(clientsResponse.body).toMatchObject(
      expect.objectContaining({
        status: 'error',
        message: 'JWT token is missing' || 'Invalid JWT token',
      }),
    );
  });
});
