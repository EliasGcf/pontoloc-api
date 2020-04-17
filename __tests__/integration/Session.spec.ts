import 'dotenv/config';
import request from 'supertest';
import { runSeeder } from 'typeorm-seeding';
import { Connection, getConnection } from 'typeorm';
import { verify } from 'jsonwebtoken';

import authConfig from '../../src/config/auth';
import createConnection from '../../src/database';
import UserAdminSeed from '../../src/database/seeds/UserAdmin.seed';

import app from '../../src/app';

let connection: Connection;

describe('Session', () => {
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

  it('should be able to create a new session and receive a token JWT', async () => {
    const response = await request(app).post('/sessions').send({
      email: 'admin@pontoloc.com.br',
      password: '123456',
    });

    const tokenVerified = verify(response.body.token, authConfig.jwt.secret);
    expect(response.status).toBe(200);
    expect(tokenVerified).toBeTruthy();
  });

  it('should not be able to create a new ssession with invalid data', async () => {
    const response = await request(app).post('/sessions').send({
      email: 'teste@gmail.com',
      password: '1255456',
    });

    expect(response.status).toBe(401);
    expect(response.body).toMatchObject(
      expect.objectContaining({
        status: 'error',
        message: 'Incorrect email/password combination.',
      }),
    );
  });
});
