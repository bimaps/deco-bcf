"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BcfUserController = void 0;
const deco_api_1 = require("deco-api");
const bcf_core_controller_1 = require("./bcf.core.controller");
const express_1 = require("express");
let debug = require('debug')('app:controller:bcf:user');
const router = (0, express_1.Router)();
router.use(deco_api_1.PolicyController.registerPolicyMountingPoint(['bcf.user']));
router.get('/', deco_api_1.AppMiddleware.fetchWithPublicKey, bcf_core_controller_1.BcfCoreControllerMiddleware.authenticate, (req, res, next) => {
    if (!res.locals.user)
        return next('Access denied');
    const user = res.locals.user;
    const rightInstance = user instanceof deco_api_1.UserModel;
    if (!rightInstance)
        return next('Invalid user');
    res.send({
        id: user.email || user._id.toString(),
        name: `${user.firstname} ${user.lastname}`
    });
});
exports.BcfUserController = router;
//# sourceMappingURL=bcf.user.controller.js.map