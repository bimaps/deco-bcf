import { BcfViewpointController } from './controllers/bcf.viewpoint.controller';
import { BcfCommentController } from './controllers/bcf.comment.controller';
import { BcfTopicController } from './controllers/bcf.topic.controller';
import { BcfProjectController } from './controllers/bcf.project.controller';
import { BcfUserController } from './controllers/bcf.user.controller';
import { BcfAuthController } from './controllers/bcf.auth.controller';
import { BcfVersionController } from './controllers/bcf.version.controller';
import { Router } from 'express';

const router: Router = Router();
// Mount BCF Controllers
router.use('/versions', BcfVersionController);
router.use('/2.1/auth', BcfAuthController)
router.use('/2.1/current-user', BcfUserController)
router.use('/2.1/projects', BcfProjectController);
router.use('/2.1/projects', BcfTopicController);
router.use('/2.1/projects', BcfCommentController);
router.use('/2.1/projects', BcfViewpointController);

export { router as BcfRoutes };