"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BcfVersionController = void 0;
const express_1 = require("express");
let debug = require('debug')('app:controller:bcf:version');
const router = express_1.Router();
router.get('/', (req, res, next) => {
    debug('VERSION');
    res.send({
        "versions": [{
                "version_id": "2.1",
                "detailed_version": "https://github.com/BuildingSMART/BCF-API"
            }]
    });
});
exports.BcfVersionController = router;
//# sourceMappingURL=bcf.version.controller.js.map