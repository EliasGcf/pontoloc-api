import request from 'supertest';

import app from '../../src/app';
import factory from '../factories';
import truncate from '../util/truncate';

describe('ContractItem', () => {
  beforeEach(async () => {
    await truncate();
  });

  describe('Create', () => {
    it('should be able to register a contract item', async () => {
      const client = await factory.attrs('Client');
      const material = await factory.attrs('Material');

      const {
        body: { id: client_id },
      } = await request(app)
        .post('/clients')
        .send(client);

      const {
        body: { id: contract_id },
      } = await request(app)
        .post('/contracts')
        .send({
          client_id,
          delivery_price: 0,
        });

      const {
        body: { id: material_id },
      } = await request(app)
        .post('/materials')
        .send(material);

      const contractItem = await factory.attrs('ContractItem', {
        contract_id,
        material_id,
      });

      const response = await request(app)
        .post('/contractItems')
        .send(contractItem);

      expect(response.status).toBe(200);
      expect(response.body).toEqual(
        expect.objectContaining({
          contract_id,
          material_id,
          quantity: contractItem.quantity,
          price_quantity_day: material.price_day * contractItem.quantity,
        })
      );
    });

    it('should not be able to register a contract item with invalid data', async () => {
      const response = await request(app)
        .post('/contractItems')
        .send();

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('error');
      expect(response.body.error).toBe('Validation fails');
    });

    it('should not be able to register a contract item with a invalid contract_id', async () => {
      const material = await factory.attrs('Material');

      const {
        body: { id: material_id },
      } = await request(app)
        .post('/materials')
        .send(material);

      const response = await request(app)
        .post('/contractItems')
        .send({
          material_id,
          contract_id: 1,
          quantity: 1,
        });

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('error');
      expect(response.body.error).toBe('Contract does not exists');
    });

    it('should not be able to register a contract item with a invalid material_id', async () => {
      const client = await factory.attrs('Client');

      const {
        body: { id: client_id },
      } = await request(app)
        .post('/clients')
        .send(client);

      const {
        body: { id: contract_id },
      } = await request(app)
        .post('/contracts')
        .send({
          client_id,
          delivery_price: 0,
        });

      const response = await request(app)
        .post('/contractItems')
        .send({
          material_id: 1,
          contract_id,
          quantity: 1,
        });

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('error');
      expect(response.body.error).toBe('Material does not exists');
    });
  });
});
