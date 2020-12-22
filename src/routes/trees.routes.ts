import { Router } from 'express';

import TreesController from '../controllers/TreesController';

const treesRouter = Router();
const treesController = new TreesController();

treesRouter.post('/', treesController.create);
treesRouter.put('/:id', treesController.update);
treesRouter.get('/', treesController.index);

export default treesRouter;
