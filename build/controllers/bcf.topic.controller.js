"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BcfTopicController = void 0;
const deco_api_1 = require("deco-api");
const bcf_project_1 = require("../models/bcf.project");
const bcf_topic_1 = require("../models/bcf.topic");
const bcf_core_controller_1 = require("./bcf.core.controller");
const express_1 = require("express");
const deco_api_2 = require("deco-api");
let debug = require('debug')('app:controller:bcf:topic');
const router = express_1.Router();
let projectController = new bcf_core_controller_1.BcfCoreControllerMiddleware(bcf_project_1.BcfProjectModel);
let topicController = new bcf_core_controller_1.BcfCoreControllerMiddleware(bcf_topic_1.BcfTopicModel);
router.get('/:projectId/topics' + deco_api_2.ControllerMiddleware.getAllRoute(), deco_api_1.AppMiddleware.fetchWithPublicKey, bcf_core_controller_1.BcfCoreControllerMiddleware.authenticate, projectController.getProjectFirst, projectController.getOne({ ignoreSend: true, ignoreOutput: true, ignoreDownload: true }), projectController.storeProjectElement, (req, res, next) => {
    if (res.locals.bcfProject) {
        req.query.projectId = res.locals.bcfProject._id.toString();
    }
    next();
}, topicController.prepareQueryFromReq(), topicController.getAll());
router.get('/:projectId/topics' + deco_api_2.ControllerMiddleware.getOneRoute(), deco_api_1.AppMiddleware.fetchWithPublicKey, bcf_core_controller_1.BcfCoreControllerMiddleware.authenticate, projectController.getProjectFirst, projectController.getOne({ ignoreSend: true, ignoreOutput: true, ignoreDownload: true }), projectController.storeProjectElement, topicController.getOne());
router.post('/:projectId/topics' + deco_api_2.ControllerMiddleware.postRoute(), deco_api_1.AppMiddleware.fetchWithPublicKey, bcf_core_controller_1.BcfCoreControllerMiddleware.authenticate, projectController.getProjectFirst, projectController.getOne({ ignoreSend: true, ignoreOutput: true, ignoreDownload: true }), projectController.storeProjectElement, topicController.prepareTopicBody(), projectController.prepareAuthorBody(), 
// AppMiddleware.addAppIdToBody('appId'),
topicController.post());
router.put('/:projectId/topics' + deco_api_2.ControllerMiddleware.putRoute(), deco_api_1.AppMiddleware.fetchWithPublicKey, bcf_core_controller_1.BcfCoreControllerMiddleware.authenticate, projectController.getProjectFirst, projectController.getOne({ ignoreSend: true, ignoreOutput: true, ignoreDownload: true }), projectController.storeProjectElement, topicController.prepareTopicBody(), projectController.prepareAuthorBody(), topicController.checkProjectAuthorization('update'), 
// AppMiddleware.addAppIdToBody('appId'),
topicController.put());
router.delete('/:projectId/topics' + deco_api_2.ControllerMiddleware.deleteRoute(), deco_api_1.AppMiddleware.fetchWithPublicKey, bcf_core_controller_1.BcfCoreControllerMiddleware.authenticate, projectController.getProjectFirst, projectController.getOne({ ignoreSend: true, ignoreOutput: true, ignoreDownload: true }), projectController.storeProjectElement, 
// AuthMiddleware.authenticate,
// AuthMiddleware.checkUserRoleAccess('adminThreeRoles'),
topicController.checkProjectAuthorization('update'), topicController.delete());
exports.BcfTopicController = router;
//# sourceMappingURL=bcf.topic.controller.js.map