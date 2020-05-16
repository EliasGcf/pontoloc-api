import { Router } from 'express';

import MaterialsController from '@modules/materials/infra/http/controllers/MaterialsController';

import validateMaterialCraete from '@modules/materials/infra/http/validators/MaterialCraete';
import validateMaterialUpdate from '@modules/materials/infra/http/validators/MaterialUpdate';
import IDParamsMustBeUUID from '@shared/infra/http/validators/IDParamsMustBeUUID';

const materialsRouter = Router();
const materialsController = new MaterialsController();

materialsRouter.use('/:id', IDParamsMustBeUUID);

materialsRouter.post('/', validateMaterialCraete, materialsController.create);

// materialsRouter.get('/', async (req, res) => {
//   const materialsRepository = getRepository(Material);

//   const materials = await materialsRepository.find({
//     order: { name: 'ASC' },
//     select: ['id', 'name', 'daily_price'],
//   });

//   return res.json(materials);
// });

// materialsRouter.get('/:id', async (req, res) => {
//   delete req.material.created_at;
//   delete req.material.updated_at;

//   return res.json(req.material);
// });

materialsRouter.put('/:id', validateMaterialUpdate, materialsController.update);

export default materialsRouter;
