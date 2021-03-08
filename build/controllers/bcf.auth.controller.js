"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BcfAuthController = void 0;
const deco_api_1 = require("deco-api");
const express_1 = require("express");
let debug = require('debug')('app:controller:bcf:version');
const router = express_1.Router();
router.get('/', deco_api_1.AppMiddleware.fetchWithPublicKey, (req, res, next) => {
    res.send({
        "oauth2_auth_url": "http://localhost:3000/bcf/auth/auth",
        "oauth2_token_url": "https://example.com/bcf/auth/token",
        // "oauth2_dynamic_client_reg_url": "https://example.com/bcf/oauth2/reg",
        "http_basic_supported": false,
        "supported_oauth2_flows": [
            "authorization_code_grant",
        ]
    });
});
router.post('/swissdata-auth-token', deco_api_1.AppMiddleware.fetchWithPublicKey, deco_api_1.AuthMiddleware.getToken);
exports.BcfAuthController = router;
//# sourceMappingURL=bcf.auth.controller.js.map