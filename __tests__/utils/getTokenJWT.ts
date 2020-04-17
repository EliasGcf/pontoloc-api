import request from 'supertest';
import app from '../../src/app';

export default async function getToken(): Promise<string> {
  const response = await request(app).post('/sessions').send({
    email: 'admin@pontoloc.com.br',
    password: '123456',
  });

  return response.body.token;
}
