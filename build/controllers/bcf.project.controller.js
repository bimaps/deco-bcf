"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BcfProjectController = void 0;
const deco_api_1 = require("deco-api");
const bcf_export_controller_1 = require("./bcf.export.controller");
const bcf_project_1 = require("../models/bcf.project");
const bcf_core_controller_1 = require("./bcf.core.controller");
const express_1 = require("express");
const multer_1 = __importDefault(require("multer"));
const storage = multer_1.default.memoryStorage();
const disk = multer_1.default.diskStorage({});
let debug = require('debug')('app:controller:bcf:project');
const router = express_1.Router();
let projectController = new bcf_core_controller_1.BcfCoreControllerMiddleware(bcf_project_1.BcfProjectModel);
let exportController = new bcf_export_controller_1.BcfExportController();
router.get(deco_api_1.ControllerMiddleware.getAllRoute(), deco_api_1.AppMiddleware.fetchWithPublicKey, bcf_core_controller_1.BcfCoreControllerMiddleware.authenticate, projectController.prepareQueryFromReq(), projectController.getAll());
router.get(deco_api_1.ControllerMiddleware.getOneRoute(), deco_api_1.AppMiddleware.fetchWithPublicKey, bcf_core_controller_1.BcfCoreControllerMiddleware.authenticate, projectController.getOne());
router.post(deco_api_1.ControllerMiddleware.postRoute(), deco_api_1.AppMiddleware.fetchWithPublicKey, bcf_core_controller_1.BcfCoreControllerMiddleware.authenticate, 
// AppMiddleware.addAppIdToBody('appId'),
projectController.prepareAuthorBody(), projectController.post());
router.put(deco_api_1.ControllerMiddleware.putRoute(), deco_api_1.AppMiddleware.fetchWithPublicKey, bcf_core_controller_1.BcfCoreControllerMiddleware.authenticate, projectController.checkProjectAuthorization('update'), 
// AppMiddleware.addAppIdToBody('appId'),
projectController.prepareAuthorBody(), projectController.put());
router.get(deco_api_1.ControllerMiddleware.getOneRoute() + '/extensions', deco_api_1.AppMiddleware.fetchWithPublicKey, bcf_core_controller_1.BcfCoreControllerMiddleware.authenticate, projectController.getOne({ ignoreSend: true, ignoreDownload: true, ignoreOutput: true }), projectController.returnProjectExtensions);
router.get(deco_api_1.ControllerMiddleware.getOneRoute() + '/export-file', deco_api_1.AppMiddleware.fetchWithPublicKey, bcf_core_controller_1.BcfCoreControllerMiddleware.authenticate, projectController.getOne({ ignoreSend: true, ignoreDownload: true, ignoreOutput: true }), exportController.generateBcfFile());
router.delete(deco_api_1.ControllerMiddleware.deleteRoute(), deco_api_1.AppMiddleware.fetchWithPublicKey, bcf_core_controller_1.BcfCoreControllerMiddleware.authenticate, projectController.checkProjectAuthorization('update'), projectController.delete());
exports.BcfProjectController = router;
//# sourceMappingURL=bcf.project.controller.js.map