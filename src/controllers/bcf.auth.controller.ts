import { AppMiddleware, AuthMiddleware } from 'deco-api';
import { Router, Request, Response, NextFunction } from 'express';
let debug = require('debug')('app:controller:bcf:version');

const router: Router = Router();

router.get(
  '/',
  AppMiddleware.fetchWithPublicKey,
  (req: Request, res: Response, next: NextFunction) => {
    res.send({
      "oauth2_auth_url": "http://localhost:3000/bcf/auth/auth",
      "oauth2_token_url": "https://example.com/bcf/auth/token",
      // "oauth2_dynamic_client_reg_url": "https://example.com/bcf/oauth2/reg",
      "http_basic_supported": false,
      "supported_oauth2_flows": [
          "authorization_code_grant",
          // "implicit_grant",
          // "resource_owner_password_credentials_grant"
      ]
    });
  }
);

router.post(
  '/swissdata-auth-token',
  AppMiddleware.fetchWithPublicKey,
  AuthMiddleware.getToken
);

export const BcfAuthController: Router = router;