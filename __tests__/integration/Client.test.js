import request from 'supertest';
import app from '../../src/app';

import factory from '../factories';
import truncate from '../util/truncate';

describe('Client', () => {
  beforeEach(async () => {
    await truncate();
  });

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

  it('should not be able to edit a client that does not exist', async () => {
    const client = await factory.attrs('Client', { cpf: '111.111.111-11' });

    const response = await request(app)
      .post('/clients')
      .send(client);

    const editClient = await request(app)
      .put(`/clients/${response.body.id + 1}`)
      .send(client);

    expect(editClient.body).toStrictEqual({ error: 'Client does not exists' });
  });

  it('should be able to edit a client with a database id', async () => {
    const client = await factory.attrs('Client', { cpf: '111.111.111-11' });

    const response = await request(app)
      .post('/clients')
      .send(client);

    const clientEdit = await factory.attrs('Client', { cpf: '000.000.000-00' });

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

    const clientEdit = await factory.attrs('Client', { cpf: '111.111.111-11' });

    const editClient = await request(app)
      .put(`/clients/${response.body.id}`)
      .send(clientEdit);

    expect(editClient.status).toBe(400);
  });
});
