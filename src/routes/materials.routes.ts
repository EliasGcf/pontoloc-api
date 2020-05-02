import { Router } from 'express';
import { getRepository } from 'typeorm';

import validateMaterialCraete from '@validators/MaterialCraete';
import validateMaterialUpdate from '@validators/MaterialUpdate';
import validateMustBeUUID from '@validators/MustBeUUID';

import CreateMaterialService from '@services/CreateMaterialService';
import UpdateMaterialService from '@services/UpdateMaterialService';

import AppError from '@errors/AppError';
import Material from '@models/Material';

const materialsRouter = Router();

materialsRouter.use('/:id', validateMustBeUUID, async (req, res, next) => {
  const materialsRepository = getRepository(Material);
  const { id } = req.params;

  const materail = await materialsRepository.findOne(id);

  if (!materail) {
    throw new AppError('Material does not exists');
  }

  req.material = materail;

  return next();
});

materialsRouter.post('/', validateMaterialCraete, async (req, res) => {
  const { name, daily_price } = req.body;

  const createMaterial = new CreateMaterialService();

  const material = await createMaterial.execute({ name, daily_price });

  return res.status(201).json(material);
});

materialsRouter.get('/', async (req, res) => {
  const materialsRepository = getRepository(Material);

  const materials = await materialsRepository.find({
    order: { name: 'ASC' },
    select: ['id', 'name', 'daily_price'],
  });

  return res.json(materials);
});

materialsRouter.get('/:id', async (req, res) => {
  delete req.material.created_at;
  delete req.material.updated_at;

  return res.json(req.material);
});

materialsRouter.put('/:id', validateMaterialUpdate, async (req, res) => {
  const { daily_price } = req.body;

  const updateMaterial = new UpdateMaterialService();

  await updateMaterial.execute({ material: req.material, daily_price });

  return res.status(204).end();
});

export default materialsRouter;
