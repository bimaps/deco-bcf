import { PolicyController } from 'deco-api';
import { Router, Request, Response, NextFunction } from 'express';
let debug = require('debug')('app:controller:bcf:version');

const router: Router = Router();

router.use(PolicyController.registerPolicyMountingPoint(['bcf.version']));

router.get(
  '/',
  (req: Request, res: Response, next: NextFunction) => {
    debug('VERSION');
    res.send({
      "versions": [{
        "version_id": "2.1",
        "detailed_version": "https://github.com/BuildingSMART/BCF-API"
      }]
    });
  }
);

export const BcfVersionController: Router = router;