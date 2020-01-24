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
    });
  });
});
