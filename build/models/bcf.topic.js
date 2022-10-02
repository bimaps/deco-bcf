"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BcfTopicModel = void 0;
const bcf_enum_1 = require("./bcf.enum");
const bcf_project_1 = require("./bcf.project");
const deco_api_1 = require("deco-api");
let debug = require('debug')('app:models:bcf:topic');
let BcfTopicModel = class BcfTopicModel extends deco_api_1.Model {
    constructor() {
        super(...arguments);
        this.authorization_topic_actions = bcf_enum_1.BcfTopicActionsOptions;
        this.authorization_topic_type = [];
        this.authorization_topic_status = [];
        this.authorization_topic_label = [];
        this.authorization_snippet_type = [];
        this.authorization_priority = [];
        this.authorization_user_id_type = [];
        this.authorization_stage = [];
    }
    output() {
        return super.output().then((data) => {
            var _a, _b, _c, _d, _e, _f, _g, _h;
            const output = {
                guid: data.id,
                creation_author: data.creation_author,
                creation_date: data._createdAt,
                modified_author: data.modified_author,
                modified_date: data._updatedAt,
                due_date: data.due_date,
                topic_type: data.topic_type,
                topic_status: data.topic_status,
                title: data.title,
                description: data.description,
                priority: data.priority,
                labels: data.labels,
                assigned_to: data.assigned_to,
                bim_snippet: {},
                reference_links: data.reference_links,
                index: data.index,
                stage: data.stage
            };
            if (this.request.query.includeAuthorization === 'true') {
                output.authorization = {};
                if ((_a = data.authorization_topic_actions) === null || _a === void 0 ? void 0 : _a.length)
                    output.authorization.topic_actions = data.authorization_topic_actions;
                if ((_b = data.authorization_topic_type) === null || _b === void 0 ? void 0 : _b.length)
                    output.authorization.topic_type = data.authorization_topic_type;
                if ((_c = data.authorization_topic_status) === null || _c === void 0 ? void 0 : _c.length)
                    output.authorization.topic_status = data.authorization_topic_status;
                if ((_d = data.authorization_topic_label) === null || _d === void 0 ? void 0 : _d.length)
                    output.authorization.topic_label = data.authorization_topic_label;
                if ((_e = data.authorization_snippet_type) === null || _e === void 0 ? void 0 : _e.length)
                    output.authorization.snippet_type = data.authorization_snippet_type;
                if ((_f = data.authorization_priority) === null || _f === void 0 ? void 0 : _f.length)
                    output.authorization.priority = data.authorization_priority;
                if ((_g = data.authorization_user_id_type) === null || _g === void 0 ? void 0 : _g.length)
                    output.authorization.user_id_type = data.authorization_user_id_type;
                if ((_h = data.authorization_stage) === null || _h === void 0 ? void 0 : _h.length)
                    output.authorization.stage = data.authorization_stage;
            }
            return output;
        });
    }
};
__decorate([
    deco_api_1.type.id
], BcfTopicModel.prototype, "_id", void 0);
__decorate([
    deco_api_1.type.model({ model: deco_api_1.AppModel }),
    deco_api_1.io.input,
    deco_api_1.io.toDocument,
    deco_api_1.query.filterable(),
    deco_api_1.validate.required
], BcfTopicModel.prototype, "appId", void 0);
__decorate([
    deco_api_1.type.model({ model: bcf_project_1.BcfProjectModel }),
    deco_api_1.io.input,
    deco_api_1.io.toDocument,
    deco_api_1.query.filterable(),
    deco_api_1.validate.required
], BcfTopicModel.prototype, "projectId", void 0);
__decorate([
    deco_api_1.type.string,
    deco_api_1.io.all,
    deco_api_1.query.filterable({ type: 'auto' }),
    deco_api_1.query.searchable
], BcfTopicModel.prototype, "topic_type", void 0);
__decorate([
    deco_api_1.type.string,
    deco_api_1.io.all,
    deco_api_1.query.filterable({ type: 'auto' }),
    deco_api_1.query.searchable
], BcfTopicModel.prototype, "topic_status", void 0);
__decorate([
    deco_api_1.type.array({ type: 'string' }),
    deco_api_1.io.all
], BcfTopicModel.prototype, "reference_links", void 0);
__decorate([
    deco_api_1.type.string,
    deco_api_1.validate.required,
    deco_api_1.io.all,
    deco_api_1.query.filterable({ type: 'auto' }),
    deco_api_1.query.searchable
], BcfTopicModel.prototype, "title", void 0);
__decorate([
    deco_api_1.type.string,
    deco_api_1.io.all,
    deco_api_1.query.filterable({ type: 'auto' }),
    deco_api_1.query.searchable
], BcfTopicModel.prototype, "priority", void 0);
__decorate([
    deco_api_1.type.integer,
    deco_api_1.io.all
], BcfTopicModel.prototype, "index", void 0);
__decorate([
    deco_api_1.type.array({ type: 'string' }),
    deco_api_1.io.all
], BcfTopicModel.prototype, "labels", void 0);
__decorate([
    deco_api_1.type.string,
    deco_api_1.io.all,
    deco_api_1.query.filterable({ type: 'auto' }),
    deco_api_1.query.searchable
], BcfTopicModel.prototype, "creation_author", void 0);
__decorate([
    deco_api_1.type.string,
    deco_api_1.io.all,
    deco_api_1.query.filterable({ type: 'auto' }),
    deco_api_1.query.searchable
], BcfTopicModel.prototype, "modified_author", void 0);
__decorate([
    deco_api_1.type.string,
    deco_api_1.io.all,
    deco_api_1.query.filterable({ type: 'auto' }),
    deco_api_1.query.searchable
], BcfTopicModel.prototype, "assigned_to", void 0);
__decorate([
    deco_api_1.type.string,
    deco_api_1.io.all,
    deco_api_1.query.filterable({ type: 'auto' }),
    deco_api_1.query.searchable
], BcfTopicModel.prototype, "stage", void 0);
__decorate([
    deco_api_1.type.string,
    deco_api_1.io.all,
    deco_api_1.query.filterable({ type: 'auto' }),
    deco_api_1.query.searchable
], BcfTopicModel.prototype, "description", void 0);
__decorate([
    deco_api_1.type.string,
    deco_api_1.io.all,
    deco_api_1.query.filterable({ type: 'auto' }),
    deco_api_1.query.searchable
], BcfTopicModel.prototype, "due_date", void 0);
__decorate([
    deco_api_1.type.select({ options: bcf_enum_1.BcfTopicActionsOptions, multiple: true }),
    deco_api_1.io.all
], BcfTopicModel.prototype, "authorization_topic_actions", void 0);
__decorate([
    deco_api_1.type.array({ type: 'string' }),
    deco_api_1.io.all
], BcfTopicModel.prototype, "authorization_topic_type", void 0);
__decorate([
    deco_api_1.type.array({ type: 'string' }),
    deco_api_1.io.all
], BcfTopicModel.prototype, "authorization_topic_status", void 0);
__decorate([
    deco_api_1.type.array({ type: 'string' }),
    deco_api_1.io.all
], BcfTopicModel.prototype, "authorization_topic_label", void 0);
__decorate([
    deco_api_1.type.array({ type: 'string' }),
    deco_api_1.io.all
], BcfTopicModel.prototype, "authorization_snippet_type", void 0);
__decorate([
    deco_api_1.type.array({ type: 'string' }),
    deco_api_1.io.all
], BcfTopicModel.prototype, "authorization_priority", void 0);
__decorate([
    deco_api_1.type.array({ type: 'string' }),
    deco_api_1.io.all
], BcfTopicModel.prototype, "authorization_user_id_type", void 0);
__decorate([
    deco_api_1.type.array({ type: 'string' }),
    deco_api_1.io.all
], BcfTopicModel.prototype, "authorization_stage", void 0);
BcfTopicModel = __decorate([
    (0, deco_api_1.model)('bcf_topic')
], BcfTopicModel);
exports.BcfTopicModel = BcfTopicModel;
//# sourceMappingURL=bcf.topic.js.map