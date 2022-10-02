"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BcfProjectModel = void 0;
const bcf_enum_1 = require("./bcf.enum");
const deco_api_1 = require("deco-api");
let debug = require('debug')('app:models:bcp:project');
let BcfProjectModel = class BcfProjectModel extends deco_api_1.Model {
    constructor() {
        super(...arguments);
        this.topic_type = bcf_enum_1.BcfTopicTypesOptions;
        this.topic_status = bcf_enum_1.BcfTopicStatusOptions;
        this.topic_label = bcf_enum_1.BcfTopicLabelOptions;
        this.snippet_type = bcf_enum_1.BcfTopicSnippetTypeOptions;
        this.priority = bcf_enum_1.BcfTopicPriorityOptions;
        this.user_id_type = [];
        this.stage = bcf_enum_1.BcfTopicStageOptions;
        this.project_actions = bcf_enum_1.BcfProjectActionsOptions;
        this.topic_actions = bcf_enum_1.BcfTopicActionsOptions;
        this.comment_actions = bcf_enum_1.BcfCommentActionsOptions;
    }
    output() {
        return super.output().then((data) => {
            const output = {
                project_id: data.id,
                name: data.name,
                creation_author: data.creation_author,
                creation_date: data._createdAt,
                modified_author: data.modified_author,
                modified_date: data._updatedAt,
            };
            if (this.request.query.includeAuthorization === 'true') {
                output.authorization = {
                    project_actions: this.project_actions
                };
            }
            return output;
        });
    }
};
__decorate([
    deco_api_1.type.id
], BcfProjectModel.prototype, "_id", void 0);
__decorate([
    deco_api_1.type.model({ model: deco_api_1.AppModel }),
    deco_api_1.io.input,
    deco_api_1.io.toDocument,
    deco_api_1.query.filterable(),
    deco_api_1.validate.required
], BcfProjectModel.prototype, "appId", void 0);
__decorate([
    deco_api_1.type.string,
    deco_api_1.io.all,
    deco_api_1.query.filterable({ type: 'auto' }),
    deco_api_1.query.searchable
], BcfProjectModel.prototype, "creation_author", void 0);
__decorate([
    deco_api_1.type.string,
    deco_api_1.io.all,
    deco_api_1.query.filterable({ type: 'auto' }),
    deco_api_1.query.searchable
], BcfProjectModel.prototype, "modified_author", void 0);
__decorate([
    deco_api_1.type.string,
    deco_api_1.validate.required,
    deco_api_1.io.all,
    deco_api_1.query.filterable({ type: 'auto' }),
    deco_api_1.query.searchable
], BcfProjectModel.prototype, "name", void 0);
__decorate([
    deco_api_1.type.array({ type: 'string' }),
    deco_api_1.io.all
], BcfProjectModel.prototype, "topic_type", void 0);
__decorate([
    deco_api_1.type.array({ type: 'string' }),
    deco_api_1.io.all
], BcfProjectModel.prototype, "topic_status", void 0);
__decorate([
    deco_api_1.type.array({ type: 'string' }),
    deco_api_1.io.all
], BcfProjectModel.prototype, "topic_label", void 0);
__decorate([
    deco_api_1.type.array({ type: 'string' }),
    deco_api_1.io.all
], BcfProjectModel.prototype, "snippet_type", void 0);
__decorate([
    deco_api_1.type.array({ type: 'string' }),
    deco_api_1.io.all
], BcfProjectModel.prototype, "priority", void 0);
__decorate([
    deco_api_1.type.array({ type: 'string' }),
    deco_api_1.io.all
], BcfProjectModel.prototype, "user_id_type", void 0);
__decorate([
    deco_api_1.type.array({ type: 'string' }),
    deco_api_1.io.all
], BcfProjectModel.prototype, "stage", void 0);
__decorate([
    deco_api_1.type.select({ options: bcf_enum_1.BcfProjectActionsOptions, multiple: true }),
    deco_api_1.io.all
], BcfProjectModel.prototype, "project_actions", void 0);
__decorate([
    deco_api_1.type.select({ options: bcf_enum_1.BcfTopicActionsOptions, multiple: true }),
    deco_api_1.io.all
], BcfProjectModel.prototype, "topic_actions", void 0);
__decorate([
    deco_api_1.type.select({ options: bcf_enum_1.BcfCommentActionsOptions, multiple: true }),
    deco_api_1.io.all
], BcfProjectModel.prototype, "comment_actions", void 0);
BcfProjectModel = __decorate([
    (0, deco_api_1.model)('bcf_project')
], BcfProjectModel);
exports.BcfProjectModel = BcfProjectModel;
//# sourceMappingURL=bcf.project.js.map