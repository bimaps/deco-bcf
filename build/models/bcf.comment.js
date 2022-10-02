"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BcfCommentModel = void 0;
const bcf_enum_1 = require("./bcf.enum");
const bcf_viewpoint_1 = require("./bcf.viewpoint");
const bcf_topic_1 = require("./bcf.topic");
const bcf_project_1 = require("./bcf.project");
const deco_api_1 = require("deco-api");
let debug = require('debug')('app:models:bcf:comment');
let BcfCommentModel = class BcfCommentModel extends deco_api_1.Model {
    constructor() {
        super(...arguments);
        this.comment_actions = bcf_enum_1.BcfCommentActionsOptions;
    }
    output() {
        return super.output().then((data) => {
            var _a;
            const output = {
                guid: data.id,
                author: data.creation_author,
                creation_author: data.creation_author,
                modified_author: data.modified_author,
                date: data._createdAt,
                creation_date: data._createdAt,
                modified_date: data._updatedAt,
                comment: data.comment,
                topic_guid: data.topicId,
                reply_to_comment_guid: data.replyTo,
                viewpoint_guid: data.viewpointId
            };
            if (this.request.query.includeAuthorization === 'true') {
                output.authorization = {};
                if ((_a = data.authorization_comment_actions) === null || _a === void 0 ? void 0 : _a.length)
                    output.authorization.comment_actions = data.authorization_comment_actions;
            }
            return output;
        });
    }
};
__decorate([
    deco_api_1.type.id
], BcfCommentModel.prototype, "_id", void 0);
__decorate([
    deco_api_1.type.model({ model: deco_api_1.AppModel }),
    deco_api_1.io.input,
    deco_api_1.io.toDocument,
    deco_api_1.query.filterable(),
    deco_api_1.validate.required
], BcfCommentModel.prototype, "appId", void 0);
__decorate([
    deco_api_1.type.model({ model: bcf_project_1.BcfProjectModel }),
    deco_api_1.io.input,
    deco_api_1.io.toDocument,
    deco_api_1.query.filterable(),
    deco_api_1.validate.required
], BcfCommentModel.prototype, "projectId", void 0);
__decorate([
    deco_api_1.type.model({ model: bcf_topic_1.BcfTopicModel }),
    deco_api_1.io.all,
    deco_api_1.query.filterable(),
    deco_api_1.validate.required
], BcfCommentModel.prototype, "topicId", void 0);
__decorate([
    deco_api_1.type.model({ model: bcf_viewpoint_1.BcfViewpointModel }),
    deco_api_1.io.all,
    deco_api_1.query.filterable()
], BcfCommentModel.prototype, "viewpointId", void 0);
__decorate([
    deco_api_1.type.string,
    deco_api_1.io.all,
    deco_api_1.query.filterable({ type: 'auto' }),
    deco_api_1.query.searchable
], BcfCommentModel.prototype, "comment", void 0);
__decorate([
    deco_api_1.type.model({ model: 'self' }),
    deco_api_1.io.all,
    deco_api_1.query.filterable()
], BcfCommentModel.prototype, "replyTo", void 0);
__decorate([
    deco_api_1.type.string,
    deco_api_1.io.all,
    deco_api_1.query.filterable({ type: 'auto' }),
    deco_api_1.query.searchable
], BcfCommentModel.prototype, "creation_author", void 0);
__decorate([
    deco_api_1.type.string,
    deco_api_1.io.all,
    deco_api_1.query.filterable({ type: 'auto' }),
    deco_api_1.query.searchable
], BcfCommentModel.prototype, "modified_author", void 0);
__decorate([
    deco_api_1.type.select({ options: bcf_enum_1.BcfCommentActionsOptions, multiple: true }),
    deco_api_1.io.all
], BcfCommentModel.prototype, "comment_actions", void 0);
BcfCommentModel = __decorate([
    (0, deco_api_1.model)('bcf_comment')
], BcfCommentModel);
exports.BcfCommentModel = BcfCommentModel;
//# sourceMappingURL=bcf.comment.js.map