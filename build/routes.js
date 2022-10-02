"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BcfRoutes = void 0;
const bcf_viewpoint_controller_1 = require("./controllers/bcf.viewpoint.controller");
const bcf_comment_controller_1 = require("./controllers/bcf.comment.controller");
const bcf_topic_controller_1 = require("./controllers/bcf.topic.controller");
const bcf_project_controller_1 = require("./controllers/bcf.project.controller");
const bcf_user_controller_1 = require("./controllers/bcf.user.controller");
const bcf_auth_controller_1 = require("./controllers/bcf.auth.controller");
const bcf_version_controller_1 = require("./controllers/bcf.version.controller");
const deco_api_1 = require("deco-api");
const express_1 = require("express");
const router = (0, express_1.Router)();
exports.BcfRoutes = router;
router.use(deco_api_1.PolicyController.registerPolicyMountingPoint('bcf'));
// Mount BCF Controllers
router.use('/versions', bcf_version_controller_1.BcfVersionController);
router.use('/2.1/auth', bcf_auth_controller_1.BcfAuthController);
router.use('/2.1/current-user', bcf_user_controller_1.BcfUserController);
router.use('/2.1/projects', bcf_project_controller_1.BcfProjectController);
router.use('/2.1/projects', bcf_topic_controller_1.BcfTopicController);
router.use('/2.1/projects', bcf_comment_controller_1.BcfCommentController);
router.use('/2.1/projects', bcf_viewpoint_controller_1.BcfViewpointController);
//# sourceMappingURL=routes.js.map