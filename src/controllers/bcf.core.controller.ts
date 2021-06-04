import { BcfProjectActions } from '../models/bcf.enum';
import { BcfTopicModel } from '../models/bcf.topic';
import { BcfProjectModel } from '../models/bcf.project';
import { PolicyController, Model, ObjectId, Query, AuthMiddleware } from 'deco-api';
import { Request, Response, NextFunction } from 'express';
let debug = require('debug')('app:controller:bcf:core');

export class BcfCoreControllerMiddleware extends PolicyController {

  public static useBCFAuthentication = true;

  public extendGetAllQuery(query: Query, req: Request, res: Response): Promise<void> {

    let appId = res.locals.app._id;
    let readQuery: any = {appId: appId};
    query.addQuery(readQuery);

    return super.extendGetAllQuery(query, req, res, {}).then(() => {

    });
  }

  public static authenticate(req: Request, res: Response, next: NextFunction) {
    if (!BcfCoreControllerMiddleware.useBCFAuthentication) {
      return next();
    }
    // TODO: this authenticate method must also implement an oAuth2
    // authenticate option to be full compatible with BCF API requirements
    return AuthMiddleware.authenticate(req, res, next);
  }

  public checkProjectAuthorization(action: BcfProjectActions) {
    return (req: Request, res: Response, next: NextFunction) => {
      if (!BcfCoreControllerMiddleware.useBCFAuthentication) {
        return next();
      }
      if (!res.locals.bcfActionRequired) res.locals.bcfActionRequired = [];
      res.locals.bcfActionRequired.push(action);
      next();
    }
  }

  public getProjectFirst(req: Request, res: Response, next: NextFunction) {
    res.locals.bcfGetProjectFirst = true;
    next();
  }

  public getTopicFirst(req: Request, res: Response, next: NextFunction) {
    res.locals.bcfGetTopicFirst = true;
    next();
  }

  public storeProjectElement(req: Request, res: Response, next: NextFunction) {
    const project = res.locals.element as BcfProjectModel;
    const rightInstance = project instanceof BcfProjectModel;
    if (rightInstance) {
      res.locals.bcfProject = res.locals.element;
    }
    next();
  }

  public storeTopicElement(req: Request, res: Response, next: NextFunction) {
    const topic = res.locals.element as BcfTopicModel;
    const rightInstance = topic instanceof BcfTopicModel;
    if (rightInstance) {
      res.locals.bcfTopic = res.locals.element;
    }
    next();
  }

  public getOneElementId(elementId: string | ObjectId, req: Request, res: Response): Promise<string | ObjectId> {
    if (res.locals.bcfGetProjectFirst && req.params.projectId) {
      res.locals.bcfGetProjectFirst = false;
      return Promise.resolve(req.params.projectId);
    }
    if (res.locals.bcfGetTopicFirst && req.params.topicId) {
      res.locals.bcfGetTopicFirst = false;
      return Promise.resolve(req.params.topicId);
    }
    return Promise.resolve(elementId);
  } 

  public putElement(element: Model, req: Request, res: Response): Promise<Model> {
    if (element instanceof BcfProjectModel && res.locals.bcfActionRequired?.length > 0) {
      for (let action of res.locals.bcfActionRequired) {
        if (element.project_actions.indexOf(action) === -1) throw new Error('Access denied');
      }
    }
    return Promise.resolve(element);
  }

  public returnProjectExtensions(req: Request, res: Response, next: NextFunction) {
    if (!res.locals.element) throw new Error('Project not found');
    const project = res.locals.element as BcfProjectModel;
    const rightInstance = project instanceof BcfProjectModel;
    if (!rightInstance) throw new Error('Invalid Project Instance');
    res.send({
      "topic_type": project.topic_type,
      "topic_status": project.topic_status,
      "topic_label": project.topic_label,
      "snippet_type": project.snippet_type,
      "priority": project.priority,
      "user_id_type": project.user_id_type,
      "stage": project.stage,
      "project_actions": project.project_actions,
      "topic_actions": project.topic_actions,
      "comment_actions": project.comment_actions
    });
  }

  public prepareAuthorBody() {
    return (req: Request, res: Response, next: NextFunction) => {
      req.body.creation_author = res.locals.user.email || res.locals.user.mobile;
      req.body.modified_author = res.locals.user.email || res.locals.user.mobile;
      next();
    }
  }

  public prepareTopicBody() {
    return (req: Request, res: Response, next: NextFunction) => {
      // validate project element
      if (!res.locals.bcfProject) return next(new Error('Project not found'));
      const project = res.locals.bcfProject as BcfProjectModel;
      const rightInstance = project instanceof BcfProjectModel;
      if (!rightInstance) return next(new Error('Invalid Project Instance'));
      // insert project id
      req.body.projectId = project._id;
      // validate fields from extension
      if (req.body.topic_type) {
        if (project.topic_type.indexOf(req.body.topic_type) === -1) {

          return next(new Error('Invalid topic_type'));
        }
      }
      if (req.body.topic_status) {
        if (project.topic_status.indexOf(req.body.topic_status) === -1) {
          return next(new Error('Invalid topic_status'));
        }
      }
      if (req.body.priority) {
        if (project.priority.indexOf(req.body.priority) === -1) {
          return next(new Error('Invalid priority'));
        }
      }
      if (req.body.assigned_to) {
        if (project.user_id_type.indexOf(req.body.assigned_to) === -1) {
          return next(new Error('Invalid assigned_to'));
        }
      }
      if (req.body.stage) {
        if (project.stage.indexOf(req.body.stage) === -1) {
          return next(new Error('Invalid stage'));
        }
      }
      // TODO: validate also the bim_snippet.snippet_type	when implementing BIM Snippet

      next();
    }
  }

  public prepareCommentBody() {
    return (req: Request, res: Response, next: NextFunction) => {
      // validate project element
      if (!res.locals.bcfProject) return next(new Error('Project not found'));
      const project = res.locals.bcfProject as BcfProjectModel;
      const rightInstance = project instanceof BcfProjectModel;
      if (!rightInstance) return next(new Error('Invalid Project Instance'));
      // validate topic element
      if (!res.locals.bcfTopic) return next(new Error('Topic not found'));
      const topic = res.locals.bcfTopic as BcfTopicModel;
      const rightInstance2 = topic instanceof BcfTopicModel;
      if (!rightInstance2) return next(new Error('Invalid Topic Instance'));
      // insert project id
      req.body.projectId = project._id;
      // insert topic id
      req.body.topicId = topic._id;

      if (req.body.viewpoint_guid) {
        req.body.viewpointId = req.body.viewpoint_guid;
        delete req.body.viewpoint_guid;
      }
      next();
    }
  }

  public prepareViewpointBody() {
    return (req: Request, res: Response, next: NextFunction) => {
      // validate project element
      if (!res.locals.bcfProject) return next(new Error('Project not found'));
      const project = res.locals.bcfProject as BcfProjectModel;
      const rightInstance = project instanceof BcfProjectModel;
      if (!rightInstance) return next(new Error('Invalid Project Instance'));
      // validate topic element
      if (!res.locals.bcfTopic) return next(new Error('Topic not found'));
      const topic = res.locals.bcfTopic as BcfTopicModel;
      const rightInstance2 = topic instanceof BcfTopicModel;
      if (!rightInstance2) return next(new Error('Invalid Topic Instance'));
      // insert project id
      req.body.projectId = project._id;
      // insert topic id
      req.body.topicId = topic._id;
      next();
    }
  }
}