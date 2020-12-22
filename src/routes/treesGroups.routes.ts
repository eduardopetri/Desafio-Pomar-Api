import { Router } from 'express';

import TreesGroupsController from '../controllers/TreesGroupsController';

const treesGroupsRouter = Router();
const treesGroupsController = new TreesGroupsController();

treesGroupsRouter.post('/', treesGroupsController.create);
treesGroupsRouter.put('/:id', treesGroupsController.update);
treesGroupsRouter.get('/', treesGroupsController.index);

export default treesGroupsRouter;
