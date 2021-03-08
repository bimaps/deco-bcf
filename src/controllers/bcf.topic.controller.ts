import { AppMiddleware } from 'deco-api';
import { BcfProjectModel } from '../models/bcf.project';
import { BcfTopicModel } from '../models/bcf.topic';
import { BcfCoreControllerMiddleware } from './bcf.core.controller';
import { Router } from 'express';
import { ControllerMiddleware } from 'deco-api';
let debug = require('debug')('app:controller:bcf:topic');

const router: Router = Router();

let projectController = new BcfCoreControllerMiddleware(BcfProjectModel);
let topicController = new BcfCoreControllerMiddleware(BcfTopicModel);

router.get(
  '/:projectId/topics' + ControllerMiddleware.getAllRoute(),
  AppMiddleware.fetchWithPublicKey,
  BcfCoreControllerMiddleware.authenticate,
  projectController.getProjectFirst,
  projectController.getOne({ignoreSend: true, ignoreOutput: true, ignoreDownload: true}),
  projectController.storeProjectElement,
  (req, res, next) => {
    if (res.locals.bcfProject) {
      req.query.projectId = res.locals.bcfProject._id.toString();
    }
    next();
  },
  topicController.prepareQueryFromReq(),
  topicController.getAll()
);

router.get(
  '/:projectId/topics' + ControllerMiddleware.getOneRoute(),
  AppMiddleware.fetchWithPublicKey,
  BcfCoreControllerMiddleware.authenticate,
  projectController.getProjectFirst,
  projectController.getOne({ignoreSend: true, ignoreOutput: true, ignoreDownload: true}),
  projectController.storeProjectElement,
  topicController.getOne()
);

router.post(
  '/:projectId/topics' + ControllerMiddleware.postRoute(),
  AppMiddleware.fetchWithPublicKey,
  BcfCoreControllerMiddleware.authenticate,
  projectController.getProjectFirst,
  projectController.getOne({ignoreSend: true, ignoreOutput: true, ignoreDownload: true}),
  projectController.storeProjectElement,
  topicController.prepareTopicBody(),
  projectController.prepareAuthorBody(),
  // AppMiddleware.addAppIdToBody('appId'),
  topicController.post()
);

router.put(
  '/:projectId/topics' + ControllerMiddleware.putRoute(),
  AppMiddleware.fetchWithPublicKey,
  BcfCoreControllerMiddleware.authenticate,
  projectController.getProjectFirst,
  projectController.getOne({ignoreSend: true, ignoreOutput: true, ignoreDownload: true}),
  projectController.storeProjectElement,
  topicController.prepareTopicBody(),
  projectController.prepareAuthorBody(),
  topicController.checkProjectAuthorization('update'),
  // AppMiddleware.addAppIdToBody('appId'),
  topicController.put()
);

router.delete(
  '/:projectId/topics' + ControllerMiddleware.deleteRoute(),
  AppMiddleware.fetchWithPublicKey,
  BcfCoreControllerMiddleware.authenticate,
  projectController.getProjectFirst,
  projectController.getOne({ignoreSend: true, ignoreOutput: true, ignoreDownload: true}),
  projectController.storeProjectElement,
  // AuthMiddleware.authenticate,
  // AuthMiddleware.checkUserRoleAccess('adminThreeRoles'),
  topicController.checkProjectAuthorization('update'),
  topicController.delete()
);

export const BcfTopicController: Router = router;