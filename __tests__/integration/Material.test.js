import request from 'supertest';

import app from '../../src/app';
import factory from '../factories';
import truncate from '../util/truncate';

describe('Material', () => {
  beforeEach(async () => {
    await truncate();
  });

  describe('Create', () => {
    it('should be able to register a material', async () => {
      const material = await factory.attrs('Material');

      const response = await request(app)
        .post('/materials')
        .send(material);

      expect(response.status).toBe(200);
    });

    it('should not be able to register with duplicated name', async () => {
      const material = await factory.attrs('Material');

      await request(app)
        .post('/materials')
        .send(material);

      const response = await request(app)
        .post('/materials')
        .send(material);

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('error');
      expect(response.body.error).toBe('This material already exists');
    });

    it('should not be able to register a material wiht invalid data', async () => {
      const response = await request(app).post('/materials');

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('error');
      expect(response.body.error).toBe('Validation fails');
    });
  });

  describe('Update', () => {
    it('should be able to edit a material with a database id', async () => {
      const material = await factory.attrs('Material');

      const {
        body: { id: material_id },
      } = await request(app)
        .post('/materials')
        .send(material);

      const response = await request(app)
        .put(`/materials/${material_id}`)
        .send({
          price_day: 1.5,
        });

      expect(response.status).toBe(200);
    });

    it('should not be bale to edit a material with a invalid data', async () => {
      const material = await factory.attrs('Material');

      const {
        body: { id: material_id },
      } = await request(app)
        .post('/materials')
        .send(material);

      const response = await request(app).put(`/materials/${material_id}`);

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('error');
      expect(response.body.error).toBe('Validation fails');
    });

    it('should not be able to edit a material with a invalid database id', async () => {
      const response = await request(app)
        .put(`/materials/${1}`)
        .send({
          price_day: 1.5,
        });

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('error');
      expect(response.body.error).toBe('Material does not exists');
    });
  });

  describe('List', () => {
    it('should be able to have a material list', async () => {
      const materials = await factory.attrsMany('Material', 2);

      await request(app)
        .post('/materials')
        .send(materials[0]);

      await request(app)
        .post('/materials')
        .send(materials[1]);

      const response = await request(app).get('/materials');

      expect(response.status).toBe(200);
      expect(response.body).toEqual([
        expect.objectContaining({
          name: materials[0].name,
          price_day: Number(materials[0].price_day),
        }),
        expect.objectContaining({
          name: materials[1].name,
          price_day: Number(materials[1].price_day),
        }),
      ]);
    });
  });
});
