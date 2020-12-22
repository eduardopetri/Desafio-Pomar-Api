import { Router } from 'express';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';

import sessionsRouter from './sessions.routes';
import usersRouter from './users.routes';
import speciesRouter from './species.routes';
import treesGroupsRouter from './treesGroups.routes';
import treesRouter from './trees.routes';

const routes = Router();

routes.use('/sessions', sessionsRouter);
routes.use('/user', usersRouter);

routes.use(ensureAuthenticated);
routes.use('/species', speciesRouter);
routes.use('/trees-groups', treesGroupsRouter);
routes.use('/trees', treesRouter);

export default routes;
