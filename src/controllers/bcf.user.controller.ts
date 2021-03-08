import { AppMiddleware, UserModel } from 'deco-api';
import { BcfCoreControllerMiddleware } from './bcf.core.controller';
import { Router, Request, Response, NextFunction } from 'express';
let debug = require('debug')('app:controller:bcf:user');

const router: Router = Router();

router.get(
  '/',
  AppMiddleware.fetchWithPublicKey,
  BcfCoreControllerMiddleware.authenticate,
  (req: Request, res: Response, next: NextFunction) => {
    if (!res.locals.user) return next('Access denied');
    const user = res.locals.user as UserModel;
    const rightInstance = user instanceof UserModel;
    if (!rightInstance) return next('Invalid user');
    res.send({      
      id: user.email || user._id.toString(),
      name: `${user.firstname} ${user.lastname}`
    });
  }
);

export const BcfUserController: Router = router;