"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BcfCoreControllerMiddleware = void 0;
const bcf_topic_1 = require("../models/bcf.topic");
const bcf_project_1 = require("../models/bcf.project");
const deco_api_1 = require("deco-api");
let debug = require('debug')('app:controller:bcf:core');
class BcfCoreControllerMiddleware extends deco_api_1.PolicyController {
    extendGetAllQuery(query, req, res) {
        let appId = res.locals.app._id;
        let readQuery = { appId: appId };
        query.addQuery(readQuery);
        return super.extendGetAllQuery(query, req, res, {}).then(() => {
        });
    }
    static authenticate(req, res, next) {
        if (!BcfCoreControllerMiddleware.useBCFAuthentication) {
            return next();
        }
        // TODO: this authenticate method must also implement an oAuth2
        // authenticate option to be full compatible with BCF API requirements
        return deco_api_1.AuthMiddleware.authenticate(req, res, next);
    }
    checkProjectAuthorization(action) {
        return (req, res, next) => {
            if (!BcfCoreControllerMiddleware.useBCFAuthentication) {
                return next();
            }
            if (!res.locals.bcfActionRequired)
                res.locals.bcfActionRequired = [];
            res.locals.bcfActionRequired.push(action);
            next();
        };
    }
    getProjectFirst(req, res, next) {
        res.locals.bcfGetProjectFirst = true;
        next();
    }
    getTopicFirst(req, res, next) {
        res.locals.bcfGetTopicFirst = true;
        next();
    }
    storeProjectElement(req, res, next) {
        const project = res.locals.element;
        const rightInstance = project instanceof bcf_project_1.BcfProjectModel;
        if (rightInstance) {
            res.locals.bcfProject = res.locals.element;
        }
        next();
    }
    storeTopicElement(req, res, next) {
        const topic = res.locals.element;
        const rightInstance = topic instanceof bcf_topic_1.BcfTopicModel;
        if (rightInstance) {
            res.locals.bcfTopic = res.locals.element;
        }
        next();
    }
    getOneElementId(elementId, req, res) {
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
    putElement(element, req, res) {
        var _a;
        if (element instanceof bcf_project_1.BcfProjectModel && ((_a = res.locals.bcfActionRequired) === null || _a === void 0 ? void 0 : _a.length) > 0) {
            for (let action of res.locals.bcfActionRequired) {
                if (element.project_actions.indexOf(action) === -1)
                    throw new Error('Access denied');
            }
        }
        return Promise.resolve(element);
    }
    returnProjectExtensions(req, res, next) {
        if (!res.locals.element)
            throw new Error('Project not found');
        const project = res.locals.element;
        const rightInstance = project instanceof bcf_project_1.BcfProjectModel;
        if (!rightInstance)
            throw new Error('Invalid Project Instance');
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
    prepareAuthorBody() {
        return (req, res, next) => {
            req.body.creation_author = res.locals.user.email || res.locals.user.mobile;
            req.body.modified_author = res.locals.user.email || res.locals.user.mobile;
            next();
        };
    }
    prepareTopicBody() {
        return (req, res, next) => {
            // validate project element
            if (!res.locals.bcfProject)
                return next(new Error('Project not found'));
            const project = res.locals.bcfProject;
            const rightInstance = project instanceof bcf_project_1.BcfProjectModel;
            if (!rightInstance)
                return next(new Error('Invalid Project Instance'));
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
        };
    }
    prepareCommentBody() {
        return (req, res, next) => {
            // validate project element
            if (!res.locals.bcfProject)
                return next(new Error('Project not found'));
            const project = res.locals.bcfProject;
            const rightInstance = project instanceof bcf_project_1.BcfProjectModel;
            if (!rightInstance)
                return next(new Error('Invalid Project Instance'));
            // validate topic element
            if (!res.locals.bcfTopic)
                return next(new Error('Topic not found'));
            const topic = res.locals.bcfTopic;
            const rightInstance2 = topic instanceof bcf_topic_1.BcfTopicModel;
            if (!rightInstance2)
                return next(new Error('Invalid Topic Instance'));
            // insert project id
            req.body.projectId = project._id;
            // insert topic id
            req.body.topicId = topic._id;
            if (req.body.viewpoint_guid) {
                req.body.viewpointId = req.body.viewpoint_guid;
                delete req.body.viewpoint_guid;
            }
            next();
        };
    }
    prepareViewpointBody() {
        return (req, res, next) => {
            // validate project element
            if (!res.locals.bcfProject)
                return next(new Error('Project not found'));
            const project = res.locals.bcfProject;
            const rightInstance = project instanceof bcf_project_1.BcfProjectModel;
            if (!rightInstance)
                return next(new Error('Invalid Project Instance'));
            // validate topic element
            if (!res.locals.bcfTopic)
                return next(new Error('Topic not found'));
            const topic = res.locals.bcfTopic;
            const rightInstance2 = topic instanceof bcf_topic_1.BcfTopicModel;
            if (!rightInstance2)
                return next(new Error('Invalid Topic Instance'));
            // insert project id
            req.body.projectId = project._id;
            // insert topic id
            req.body.topicId = topic._id;
            next();
        };
    }
}
exports.BcfCoreControllerMiddleware = BcfCoreControllerMiddleware;
BcfCoreControllerMiddleware.useBCFAuthentication = true;
//# sourceMappingURL=bcf.core.controller.js.map