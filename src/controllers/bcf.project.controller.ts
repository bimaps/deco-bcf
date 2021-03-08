import { AppMiddleware, ControllerMiddleware } from 'deco-api';
import { BcfExportController } from './bcf.export.controller';
import { BcfProjectModel } from '../models/bcf.project';
import { BcfCoreControllerMiddleware } from './bcf.core.controller';
import { Router } from 'express';
import multer from 'multer';
const storage = multer.memoryStorage()
const disk = multer.diskStorage({});
let debug = require('debug')('app:controller:bcf:project');

const router: Router = Router();

let projectController = new BcfCoreControllerMiddleware(BcfProjectModel);
let exportController = new BcfExportController();

router.get(
  ControllerMiddleware.getAllRoute(),
  AppMiddleware.fetchWithPublicKey,
  BcfCoreControllerMiddleware.authenticate,
  projectController.prepareQueryFromReq(),
  projectController.getAll()
);

router.get(
  ControllerMiddleware.getOneRoute(),
  AppMiddleware.fetchWithPublicKey,
  BcfCoreControllerMiddleware.authenticate,
  projectController.getOne()
);

router.post(
  ControllerMiddleware.postRoute(),
  AppMiddleware.fetchWithPublicKey,
  BcfCoreControllerMiddleware.authenticate,
  // AppMiddleware.addAppIdToBody('appId'),
  projectController.prepareAuthorBody(),
  projectController.post()
);

router.put(
  ControllerMiddleware.putRoute(),
  AppMiddleware.fetchWithPublicKey,
  BcfCoreControllerMiddleware.authenticate,
  projectController.checkProjectAuthorization('update'),
  // AppMiddleware.addAppIdToBody('appId'),
  projectController.prepareAuthorBody(),
  projectController.put()
);

router.get(
  ControllerMiddleware.getOneRoute() + '/extensions',
  AppMiddleware.fetchWithPublicKey,
  BcfCoreControllerMiddleware.authenticate,
  projectController.getOne({ignoreSend: true, ignoreDownload: true, ignoreOutput: true}),
  projectController.returnProjectExtensions
);

router.get(
  ControllerMiddleware.getOneRoute() + '/export-file',
  AppMiddleware.fetchWithPublicKey,
  BcfCoreControllerMiddleware.authenticate,
  projectController.getOne({ignoreSend: true, ignoreDownload: true, ignoreOutput: true}),
  exportController.generateBcfFile()
);

router.delete(
  ControllerMiddleware.deleteRoute(),
  AppMiddleware.fetchWithPublicKey,
  BcfCoreControllerMiddleware.authenticate,
  projectController.checkProjectAuthorization('update'),
  projectController.delete()
);

export const BcfProjectController: Router = router;