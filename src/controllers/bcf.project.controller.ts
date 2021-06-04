import { AppMiddleware, ControllerMiddleware } from 'deco-api';
import { BcfExportController } from './bcf.export.controller';
import { BcfProjectModel } from '../models/bcf.project';
import { BcfCoreControllerMiddleware } from './bcf.core.controller';
import { Router } from 'express';
let debug = require('debug')('app:controller:bcf:project');

const router: Router = Router();

let projectController = new BcfCoreControllerMiddleware(BcfProjectModel);
let exportController = new BcfExportController();

router.use(projectController.registerPolicyMountingPoint(['bcf.project']));

router.get(
  ControllerMiddleware.getAllRoute(),
  AppMiddleware.fetchWithPublicKey,
  BcfCoreControllerMiddleware.authenticate,
  projectController.registerPolicyMountingPoint(['bcf.project.get']),
  projectController.prepareQueryFromReq(),
  projectController.getAll()
);

router.get(
  ControllerMiddleware.getOneRoute(),
  AppMiddleware.fetchWithPublicKey,
  BcfCoreControllerMiddleware.authenticate,
  projectController.registerPolicyMountingPoint(['bcf.project.get']),
  projectController.getOne()
);

router.post(
  ControllerMiddleware.postRoute(),
  AppMiddleware.fetchWithPublicKey,
  BcfCoreControllerMiddleware.authenticate,
  projectController.registerPolicyMountingPoint(['bcf.project.write', 'bcf.project.post']),
  projectController.prepareAuthorBody(),
  projectController.post()
);

router.put(
  ControllerMiddleware.putRoute(),
  AppMiddleware.fetchWithPublicKey,
  BcfCoreControllerMiddleware.authenticate,
  projectController.checkProjectAuthorization('update'),
  projectController.registerPolicyMountingPoint(['bcf.project.write', 'bcf.project.put']),
  projectController.prepareAuthorBody(),
  projectController.put()
);

router.get(
  ControllerMiddleware.getOneRoute() + '/extensions',
  AppMiddleware.fetchWithPublicKey,
  BcfCoreControllerMiddleware.authenticate,
  projectController.registerPolicyMountingPoint(['bcf.project.get']),
  projectController.getOne({ignoreSend: true, ignoreDownload: true, ignoreOutput: true}),
  projectController.returnProjectExtensions
);

router.get(
  ControllerMiddleware.getOneRoute() + '/export-file',
  AppMiddleware.fetchWithPublicKey,
  BcfCoreControllerMiddleware.authenticate,
  projectController.registerPolicyMountingPoint(['bcf.project.export']),
  projectController.getOne({ignoreSend: true, ignoreDownload: true, ignoreOutput: true}),
  exportController.generateBcfFile()
);

router.delete(
  ControllerMiddleware.deleteRoute(),
  AppMiddleware.fetchWithPublicKey,
  BcfCoreControllerMiddleware.authenticate,
  projectController.registerPolicyMountingPoint(['bcf.project.write', 'bcf.project.delete']),
  projectController.checkProjectAuthorization('update'),
  projectController.delete()
);

export const BcfProjectController: Router = router;