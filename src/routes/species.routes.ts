import { Router } from 'express';

import SpeciesController from '../controllers/SpeciesController';

const speciesRouter = Router();
const speciesController = new SpeciesController();

speciesRouter.post('/', speciesController.create);
speciesRouter.put('/:id', speciesController.update);
speciesRouter.get('/', speciesController.index);

export default speciesRouter;
