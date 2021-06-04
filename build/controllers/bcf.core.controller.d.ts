import { BcfProjectActions } from '../models/bcf.enum';
import { PolicyController, Model, ObjectId, Query } from 'deco-api';
import { Request, Response, NextFunction } from 'express';
export declare class BcfCoreControllerMiddleware extends PolicyController {
    static useBCFAuthentication: boolean;
    extendGetAllQuery(query: Query, req: Request, res: Response): Promise<void>;
    static authenticate(req: Request, res: Response, next: NextFunction): void;
    checkProjectAuthorization(action: BcfProjectActions): (req: Request, res: Response, next: NextFunction) => void;
    getProjectFirst(req: Request, res: Response, next: NextFunction): void;
    getTopicFirst(req: Request, res: Response, next: NextFunction): void;
    storeProjectElement(req: Request, res: Response, next: NextFunction): void;
    storeTopicElement(req: Request, res: Response, next: NextFunction): void;
    getOneElementId(elementId: string | ObjectId, req: Request, res: Response): Promise<string | ObjectId>;
    putElement(element: Model, req: Request, res: Response): Promise<Model>;
    returnProjectExtensions(req: Request, res: Response, next: NextFunction): void;
    prepareAuthorBody(): (req: Request, res: Response, next: NextFunction) => void;
    prepareTopicBody(): (req: Request, res: Response, next: NextFunction) => void;
    prepareCommentBody(): (req: Request, res: Response, next: NextFunction) => void;
    prepareViewpointBody(): (req: Request, res: Response, next: NextFunction) => void;
}
//# sourceMappingURL=bcf.core.controller.d.ts.map