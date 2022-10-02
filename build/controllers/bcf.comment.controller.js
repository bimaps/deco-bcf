"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BcfCommentController = void 0;
const bcf_comment_1 = require("../models/bcf.comment");
const bcf_project_1 = require("../models/bcf.project");
const bcf_topic_1 = require("../models/bcf.topic");
const bcf_core_controller_1 = require("./bcf.core.controller");
const deco_api_1 = require("deco-api");
const express_1 = require("express");
const deco_api_2 = require("deco-api");
let debug = require('debug')('app:controller:bcf:topic');
const router = (0, express_1.Router)();
let projectController = new bcf_core_controller_1.BcfCoreControllerMiddleware(bcf_project_1.BcfProjectModel);
let topicController = new bcf_core_controller_1.BcfCoreControllerMiddleware(bcf_topic_1.BcfTopicModel);
let commentController = new bcf_core_controller_1.BcfCoreControllerMiddleware(bcf_comment_1.BcfCommentModel);
router.use(projectController.registerPolicyMountingPoint('bcf.comment'));
router.get('/:projectId/topics/:topicId/comments' + deco_api_2.ControllerMiddleware.getAllRoute(), deco_api_1.AppMiddleware.fetchWithPublicKey, bcf_core_controller_1.BcfCoreControllerMiddleware.authenticate, projectController.getProjectFirst, projectController.getOne({ ignoreSend: true, ignoreOutput: true, ignoreDownload: true }), projectController.storeProjectElement, topicController.getTopicFirst, topicController.getOne({ ignoreSend: true, ignoreOutput: true, ignoreDownload: true }), topicController.storeTopicElement, (req, res, next) => {
    if (res.locals.bcfProject) {
        req.query.projectId = res.locals.bcfProject._id.toString();
    }
    if (res.locals.bcfTopic) {
        req.query.topicId = res.locals.bcfTopic._id.toString();
    }
    next();
}, commentController.registerPolicyMountingPoint(['bcf.comment.get']), commentController.prepareQueryFromReq(), commentController.getAll());
router.get('/:projectId/topics/:topicId/comments' + deco_api_2.ControllerMiddleware.getOneRoute(), deco_api_1.AppMiddleware.fetchWithPublicKey, bcf_core_controller_1.BcfCoreControllerMiddleware.authenticate, projectController.getProjectFirst, projectController.getOne({ ignoreSend: true, ignoreOutput: true, ignoreDownload: true }), projectController.storeProjectElement, topicController.getTopicFirst, topicController.getOne({ ignoreSend: true, ignoreOutput: true, ignoreDownload: true }), commentController.storeTopicElement, commentController.registerPolicyMountingPoint(['bcf.comment.get']), commentController.getOne());
router.post('/:projectId/topics/:topicId/comments' + deco_api_2.ControllerMiddleware.postRoute(), deco_api_1.AppMiddleware.fetchWithPublicKey, bcf_core_controller_1.BcfCoreControllerMiddleware.authenticate, projectController.getProjectFirst, projectController.getOne({ ignoreSend: true, ignoreOutput: true, ignoreDownload: true }), projectController.storeProjectElement, topicController.getTopicFirst, topicController.getOne({ ignoreSend: true, ignoreOutput: true, ignoreDownload: true }), topicController.storeTopicElement, commentController.prepareCommentBody(), projectController.prepareAuthorBody(), commentController.registerPolicyMountingPoint(['bcf.comment.write', 'bcf.comment.post']), commentController.post());
router.put('/:projectId/topics/:topicId/comments' + deco_api_2.ControllerMiddleware.putRoute(), deco_api_1.AppMiddleware.fetchWithPublicKey, bcf_core_controller_1.BcfCoreControllerMiddleware.authenticate, projectController.getProjectFirst, projectController.getOne({ ignoreSend: true, ignoreOutput: true, ignoreDownload: true }), projectController.storeProjectElement, topicController.getTopicFirst, topicController.getOne({ ignoreSend: true, ignoreOutput: true, ignoreDownload: true }), topicController.storeTopicElement, commentController.prepareCommentBody(), projectController.prepareAuthorBody(), commentController.registerPolicyMountingPoint(['bcf.comment.write', 'bcf.comment.put']), commentController.put());
router.delete('/:projectId/topics/:topicId/comments' + deco_api_2.ControllerMiddleware.deleteRoute(), deco_api_1.AppMiddleware.fetchWithPublicKey, bcf_core_controller_1.BcfCoreControllerMiddleware.authenticate, projectController.getProjectFirst, projectController.getOne({ ignoreSend: true, ignoreOutput: true, ignoreDownload: true }), projectController.storeProjectElement, topicController.getTopicFirst, topicController.getOne({ ignoreSend: true, ignoreOutput: true, ignoreDownload: true }), topicController.storeTopicElement, commentController.registerPolicyMountingPoint(['bcf.comment.write', 'bcf.comment.delete']), commentController.delete());
exports.BcfCommentController = router;
//# sourceMappingURL=bcf.comment.controller.js.map