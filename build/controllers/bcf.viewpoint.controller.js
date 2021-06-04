"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BcfViewpointController = void 0;
const bcf_viewpoint_1 = require("../models/bcf.viewpoint");
const bcf_project_1 = require("../models/bcf.project");
const bcf_topic_1 = require("../models/bcf.topic");
const bcf_core_controller_1 = require("./bcf.core.controller");
const deco_api_1 = require("deco-api");
const express_1 = require("express");
let debug = require('debug')('app:controller:bcf:topic');
const router = express_1.Router();
let projectController = new bcf_core_controller_1.BcfCoreControllerMiddleware(bcf_project_1.BcfProjectModel);
let topicController = new bcf_core_controller_1.BcfCoreControllerMiddleware(bcf_topic_1.BcfTopicModel);
let viewpointController = new bcf_core_controller_1.BcfCoreControllerMiddleware(bcf_viewpoint_1.BcfViewpointModel);
router.use(viewpointController.registerPolicyMountingPoint('bcf.viewpoint'));
router.get('/:projectId/topics/:topicId/viewpoints' + deco_api_1.ControllerMiddleware.getAllRoute(), deco_api_1.AppMiddleware.fetchWithPublicKey, bcf_core_controller_1.BcfCoreControllerMiddleware.authenticate, projectController.getProjectFirst, projectController.getOne({ ignoreSend: true, ignoreOutput: true, ignoreDownload: true }), projectController.storeProjectElement, topicController.getTopicFirst, topicController.getOne({ ignoreSend: true, ignoreOutput: true, ignoreDownload: true }), topicController.storeTopicElement, (req, res, next) => {
    if (res.locals.bcfProject) {
        req.query.projectId = res.locals.bcfProject._id.toString();
    }
    if (res.locals.bcfTopic) {
        req.query.topicId = res.locals.bcfTopic._id.toString();
    }
    next();
}, viewpointController.prepareQueryFromReq(), viewpointController.registerPolicyMountingPoint(['bcf.viewpoint.get']), viewpointController.getAll());
router.get('/:projectId/topics/:topicId/viewpoints' + deco_api_1.ControllerMiddleware.getOneRoute(), deco_api_1.AppMiddleware.fetchWithPublicKey, bcf_core_controller_1.BcfCoreControllerMiddleware.authenticate, projectController.getProjectFirst, projectController.getOne({ ignoreSend: true, ignoreOutput: true, ignoreDownload: true }), projectController.storeProjectElement, topicController.getTopicFirst, topicController.getOne({ ignoreSend: true, ignoreOutput: true, ignoreDownload: true }), viewpointController.storeTopicElement, viewpointController.registerPolicyMountingPoint(['bcf.viewpoint.get']), viewpointController.getOne());
router.post('/:projectId/topics/:topicId/viewpoints' + deco_api_1.ControllerMiddleware.postRoute(), deco_api_1.AppMiddleware.fetchWithPublicKey, bcf_core_controller_1.BcfCoreControllerMiddleware.authenticate, projectController.getProjectFirst, projectController.getOne({ ignoreSend: true, ignoreOutput: true, ignoreDownload: true }), projectController.storeProjectElement, topicController.getTopicFirst, topicController.getOne({ ignoreSend: true, ignoreOutput: true, ignoreDownload: true }), topicController.storeTopicElement, viewpointController.prepareViewpointBody(), viewpointController.prepareAuthorBody(), viewpointController.registerPolicyMountingPoint(['bcf.viewpoint.write', 'bcf.viewpoint.post']), viewpointController.post());
router.put('/:projectId/topics/:topicId/viewpoints' + deco_api_1.ControllerMiddleware.putRoute(), deco_api_1.AppMiddleware.fetchWithPublicKey, bcf_core_controller_1.BcfCoreControllerMiddleware.authenticate, projectController.getProjectFirst, projectController.getOne({ ignoreSend: true, ignoreOutput: true, ignoreDownload: true }), projectController.storeProjectElement, topicController.getTopicFirst, topicController.getOne({ ignoreSend: true, ignoreOutput: true, ignoreDownload: true }), topicController.storeTopicElement, viewpointController.prepareViewpointBody(), viewpointController.prepareAuthorBody(), viewpointController.registerPolicyMountingPoint(['bcf.viewpoint.write', 'bcf.viewpoint.put']), viewpointController.put());
router.delete('/:projectId/topics/:topicId/viewpoints' + deco_api_1.ControllerMiddleware.deleteRoute(), deco_api_1.AppMiddleware.fetchWithPublicKey, bcf_core_controller_1.BcfCoreControllerMiddleware.authenticate, projectController.getProjectFirst, projectController.getOne({ ignoreSend: true, ignoreOutput: true, ignoreDownload: true }), projectController.storeProjectElement, topicController.getTopicFirst, topicController.getOne({ ignoreSend: true, ignoreOutput: true, ignoreDownload: true }), topicController.storeTopicElement, viewpointController.registerPolicyMountingPoint(['bcf.viewpoint.write', 'bcf.viewpoint.delete']), viewpointController.delete());
exports.BcfViewpointController = router;
//# sourceMappingURL=bcf.viewpoint.controller.js.map