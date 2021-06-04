import { BcfCommentModel } from '../models/bcf.comment';
import { BcfProjectModel } from '../models/bcf.project';
import { BcfTopicModel } from '../models/bcf.topic';
import { BcfCoreControllerMiddleware } from './bcf.core.controller';
import { AppMiddleware } from 'deco-api';
import { Router } from 'express';
import { ControllerMiddleware } from 'deco-api';
let debug = require('debug')('app:controller:bcf:topic');

const router: Router = Router();

let projectController = new BcfCoreControllerMiddleware(BcfProjectModel);
let topicController = new BcfCoreControllerMiddleware(BcfTopicModel);
let commentController = new BcfCoreControllerMiddleware(BcfCommentModel);

router.use(projectController.registerPolicyMountingPoint('bcf.comment'))

router.get(
  '/:projectId/topics/:topicId/comments' + ControllerMiddleware.getAllRoute(),
  AppMiddleware.fetchWithPublicKey,
  BcfCoreControllerMiddleware.authenticate,
  projectController.getProjectFirst,
  projectController.getOne({ignoreSend: true, ignoreOutput: true, ignoreDownload: true}),
  projectController.storeProjectElement,
  topicController.getTopicFirst,
  topicController.getOne({ignoreSend: true, ignoreOutput: true, ignoreDownload: true}),
  topicController.storeTopicElement,
  (req, res, next) => {
    if (res.locals.bcfProject) {
      req.query.projectId = res.locals.bcfProject._id.toString();
    }
    if (res.locals.bcfTopic) {
      req.query.topicId = res.locals.bcfTopic._id.toString();
    }
    next();
  },
  commentController.registerPolicyMountingPoint(['bcf.comment.get']),
  commentController.prepareQueryFromReq(),
  commentController.getAll()
);

router.get(
  '/:projectId/topics/:topicId/comments' + ControllerMiddleware.getOneRoute(),
  AppMiddleware.fetchWithPublicKey,
  BcfCoreControllerMiddleware.authenticate,
  projectController.getProjectFirst,
  projectController.getOne({ignoreSend: true, ignoreOutput: true, ignoreDownload: true}),
  projectController.storeProjectElement,
  topicController.getTopicFirst,
  topicController.getOne({ignoreSend: true, ignoreOutput: true, ignoreDownload: true}),
  commentController.storeTopicElement,
  commentController.registerPolicyMountingPoint(['bcf.comment.get']),
  commentController.getOne()
);

router.post(
  '/:projectId/topics/:topicId/comments' + ControllerMiddleware.postRoute(),
  AppMiddleware.fetchWithPublicKey,
  BcfCoreControllerMiddleware.authenticate,
  projectController.getProjectFirst,
  projectController.getOne({ignoreSend: true, ignoreOutput: true, ignoreDownload: true}),
  projectController.storeProjectElement,
  topicController.getTopicFirst,
  topicController.getOne({ignoreSend: true, ignoreOutput: true, ignoreDownload: true}),
  topicController.storeTopicElement,
  commentController.prepareCommentBody(),
  projectController.prepareAuthorBody(),
  commentController.registerPolicyMountingPoint(['bcf.comment.write', 'bcf.comment.post']),
  commentController.post()
);

router.put(
  '/:projectId/topics/:topicId/comments' + ControllerMiddleware.putRoute(),
  AppMiddleware.fetchWithPublicKey,
  BcfCoreControllerMiddleware.authenticate,
  projectController.getProjectFirst,
  projectController.getOne({ignoreSend: true, ignoreOutput: true, ignoreDownload: true}),
  projectController.storeProjectElement,
  topicController.getTopicFirst,
  topicController.getOne({ignoreSend: true, ignoreOutput: true, ignoreDownload: true}),
  topicController.storeTopicElement,
  commentController.prepareCommentBody(),
  projectController.prepareAuthorBody(),
  commentController.registerPolicyMountingPoint(['bcf.comment.write', 'bcf.comment.put']),
  commentController.put()
);

router.delete(
  '/:projectId/topics/:topicId/comments' + ControllerMiddleware.deleteRoute(),
  AppMiddleware.fetchWithPublicKey,
  BcfCoreControllerMiddleware.authenticate,
  projectController.getProjectFirst,
  projectController.getOne({ignoreSend: true, ignoreOutput: true, ignoreDownload: true}),
  projectController.storeProjectElement,
  topicController.getTopicFirst,
  topicController.getOne({ignoreSend: true, ignoreOutput: true, ignoreDownload: true}),
  topicController.storeTopicElement,
  commentController.registerPolicyMountingPoint(['bcf.comment.write', 'bcf.comment.delete']),
  commentController.delete()
);

export const BcfCommentController: Router = router;