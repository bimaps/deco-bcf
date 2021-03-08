import { BcfViewpointModel } from '../models/bcf.viewpoint';
import { BcfProjectModel } from '../models/bcf.project';
import { BcfTopicModel } from '../models/bcf.topic';
import { BcfCoreControllerMiddleware } from './bcf.core.controller';
import { AppMiddleware, ControllerMiddleware } from 'deco-api';
import { Router } from 'express';
let debug = require('debug')('app:controller:bcf:topic');

const router: Router = Router();

let projectController = new BcfCoreControllerMiddleware(BcfProjectModel);
let topicController = new BcfCoreControllerMiddleware(BcfTopicModel);
let viewpointController = new BcfCoreControllerMiddleware(BcfViewpointModel);

router.get(
  '/:projectId/topics/:topicId/viewpoints' + ControllerMiddleware.getAllRoute(),
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
  viewpointController.prepareQueryFromReq(),
  viewpointController.getAll()
);

router.get(
  '/:projectId/topics/:topicId/viewpoints' + ControllerMiddleware.getOneRoute(),
  AppMiddleware.fetchWithPublicKey,
  BcfCoreControllerMiddleware.authenticate,
  projectController.getProjectFirst,
  projectController.getOne({ignoreSend: true, ignoreOutput: true, ignoreDownload: true}),
  projectController.storeProjectElement,
  topicController.getTopicFirst,
  topicController.getOne({ignoreSend: true, ignoreOutput: true, ignoreDownload: true}),
  viewpointController.storeTopicElement,
  viewpointController.getOne()
);

router.post(
  '/:projectId/topics/:topicId/viewpoints' + ControllerMiddleware.postRoute(),
  AppMiddleware.fetchWithPublicKey,
  BcfCoreControllerMiddleware.authenticate,
  projectController.getProjectFirst,
  projectController.getOne({ignoreSend: true, ignoreOutput: true, ignoreDownload: true}),
  projectController.storeProjectElement,
  topicController.getTopicFirst,
  topicController.getOne({ignoreSend: true, ignoreOutput: true, ignoreDownload: true}),
  topicController.storeTopicElement,
  viewpointController.prepareViewpointBody(),
  viewpointController.prepareAuthorBody(),
  // AppMiddleware.addAppIdToBody('appId'),
  viewpointController.post()
);

router.put(
  '/:projectId/topics/:topicId/viewpoints' + ControllerMiddleware.putRoute(),
  AppMiddleware.fetchWithPublicKey,
  BcfCoreControllerMiddleware.authenticate,
  projectController.getProjectFirst,
  projectController.getOne({ignoreSend: true, ignoreOutput: true, ignoreDownload: true}),
  projectController.storeProjectElement,
  topicController.getTopicFirst,
  topicController.getOne({ignoreSend: true, ignoreOutput: true, ignoreDownload: true}),
  topicController.storeTopicElement,
  viewpointController.prepareViewpointBody(),
  viewpointController.prepareAuthorBody(),
  // AppMiddleware.addAppIdToBody('appId'),
  viewpointController.put()
);

router.delete(
  '/:projectId/topics/:topicId/viewpoints' + ControllerMiddleware.deleteRoute(),
  AppMiddleware.fetchWithPublicKey,
  BcfCoreControllerMiddleware.authenticate,
  projectController.getProjectFirst,
  projectController.getOne({ignoreSend: true, ignoreOutput: true, ignoreDownload: true}),
  projectController.storeProjectElement,
  topicController.getTopicFirst,
  topicController.getOne({ignoreSend: true, ignoreOutput: true, ignoreDownload: true}),
  topicController.storeTopicElement,
  // topicController.checkProjectAuthorization('update'),
  viewpointController.delete()
);

export const BcfViewpointController: Router = router;