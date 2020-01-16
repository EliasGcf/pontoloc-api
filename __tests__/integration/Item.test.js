import request from 'supertest';

import app from '../../src/app';
import factory from '../factories';
import truncate from '../util/truncate';

describe('Item', () => {
  beforeEach(async () => {
    await truncate();
  });

  describe('Create', () => {
    it('should be able to register a new item', async () => {
      const item = await factory.attrs('Item');

      const response = await request(app)
        .post('/items')
        .send(item);

      expect(response.body).toHaveProperty('id');
    });

    it('should not be able to register a new item with a duplicate name', async () => {
      const item = await factory.attrs('Item');

      await request(app)
        .post('/items')
        .send(item);

      const response = await request(app)
        .post('/items')
        .send(item);

      expect(response.status).toBe(400);
    });
  });

  describe('Update', () => {
    it('should be able to edit a item', async () => {
      const item = await factory.attrs('Item');

      const response = await request(app)
        .post('/items')
        .send(item);

      const newItem = await factory.attrs('Item', { name: 'Andaime' });
      const editedResponse = await request(app)
        .put(`/items/${response.body.id}`)
        .send(newItem);

      expect(editedResponse.status).toBe(200);
      expect(editedResponse.body.name).toBe('Andaime');
    });

    it('should not be able to edit an item to a name is already used', async () => {
      const firstItem = await factory.attrs('Item');
      await request(app)
        .post('/items')
        .send(firstItem);

      const secondItem = await factory.attrs('Item');
      const response = await request(app)
        .post('/items')
        .send(secondItem);

      const uptadeResponse = await request(app)
        .put(`/items/${response.body.id}`)
        .send(firstItem);

      expect(uptadeResponse.status).toBe(400);
    });
  });

  describe('List', () => {
    it('should be able to list all items it are registed', async () => {
      const item = await factory.attrs('Item');

      await request(app)
        .post('/items')
        .send(item);

      const response = await request(app).get('/items');

      expect(response.body).toHaveLength(1);
      expect(response.status).toBe(200);
    });
  });
});
