"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BcfViewpointModel = void 0;
const bcf_topic_1 = require("./bcf.topic");
const bcf_project_1 = require("./bcf.project");
const deco_api_1 = require("deco-api");
let debug = require('debug')('app:models:bcf:viewpoint');
const componentArrayDefinition = { type: 'array', options: {
        type: 'object',
        options: { keys: {
                ifc_guid: { type: 'string' },
                originating_system: { type: 'string' },
                authoring_tool_id: { type: 'string' },
            } }
    } };
let BcfViewpointModel = class BcfViewpointModel extends deco_api_1.Model {
    output() {
        return super.output().then((data) => {
            const output = {
                guid: data.id,
                author: data.creation_author,
                creation_author: data.creation_author,
                modified_author: data.modified_author,
                date: data._createdAt,
                creation_date: data._createdAt,
                modified_date: data._updatedAt,
                orthogonal_camera: data.orthogonal_camera,
                perspective_camera: data.perspective_camera,
                lines: data.lines,
                clipping_planes: data.clipping_planes,
                bitmaps: data.bitmaps,
                snapshot: data.snapshot,
                components: data.components,
                topic_guid: data.topicId
            };
            return output;
        });
    }
};
__decorate([
    deco_api_1.type.id
], BcfViewpointModel.prototype, "_id", void 0);
__decorate([
    deco_api_1.type.model({ model: deco_api_1.AppModel }),
    deco_api_1.io.input,
    deco_api_1.io.toDocument,
    deco_api_1.query.filterable(),
    deco_api_1.validate.required
], BcfViewpointModel.prototype, "appId", void 0);
__decorate([
    deco_api_1.type.model({ model: bcf_project_1.BcfProjectModel }),
    deco_api_1.io.input,
    deco_api_1.io.toDocument,
    deco_api_1.query.filterable(),
    deco_api_1.validate.required
], BcfViewpointModel.prototype, "projectId", void 0);
__decorate([
    deco_api_1.type.model({ model: bcf_topic_1.BcfTopicModel }),
    deco_api_1.io.all,
    deco_api_1.query.filterable(),
    deco_api_1.validate.required
], BcfViewpointModel.prototype, "topicId", void 0);
__decorate([
    deco_api_1.type.object({ keys: {
            camera_view_point: { type: 'object', required: true, options: { keys: {
                        x: { type: 'float', required: true },
                        y: { type: 'float', required: true },
                        z: { type: 'float', required: true }
                    } } },
            camera_direction: { type: 'object', required: true, options: { keys: {
                        x: { type: 'float', required: true },
                        y: { type: 'float', required: true },
                        z: { type: 'float', required: true }
                    } } },
            camera_up_vector: { type: 'object', required: true, options: { keys: {
                        x: { type: 'float', required: true },
                        y: { type: 'float', required: true },
                        z: { type: 'float', required: true }
                    } } },
            view_to_world_scale: { type: 'float', required: true }
        } }),
    deco_api_1.io.all
], BcfViewpointModel.prototype, "orthogonal_camera", void 0);
__decorate([
    deco_api_1.type.object({ keys: {
            camera_view_point: { type: 'object', required: true, options: { keys: {
                        x: { type: 'float', required: true },
                        y: { type: 'float', required: true },
                        z: { type: 'float', required: true }
                    } } },
            camera_direction: { type: 'object', required: true, options: { keys: {
                        x: { type: 'float', required: true },
                        y: { type: 'float', required: true },
                        z: { type: 'float', required: true }
                    } } },
            camera_up_vector: { type: 'object', required: true, options: { keys: {
                        x: { type: 'float', required: true },
                        y: { type: 'float', required: true },
                        z: { type: 'float', required: true }
                    } } },
            field_of_view: { type: 'float', required: true }
        } }),
    deco_api_1.io.all
], BcfViewpointModel.prototype, "perspective_camera", void 0);
__decorate([
    deco_api_1.type.array({ type: 'object', options: { keys: {
                'start_point': { type: 'object', required: true, options: { keys: {
                            x: { type: 'float', required: true },
                            y: { type: 'float', required: true },
                            z: { type: 'float', required: true }
                        } } },
                'end_point': { type: 'object', required: true, options: { keys: {
                            x: { type: 'float', required: true },
                            y: { type: 'float', required: true },
                            z: { type: 'float', required: true }
                        } } }
            } } }),
    deco_api_1.io.all
], BcfViewpointModel.prototype, "lines", void 0);
__decorate([
    deco_api_1.type.any,
    deco_api_1.io.all
    // TODO: set the right validation values
], BcfViewpointModel.prototype, "clipping_planes", void 0);
__decorate([
    deco_api_1.type.any,
    deco_api_1.io.all
    // TODO: set the right validation values
], BcfViewpointModel.prototype, "bitmaps", void 0);
__decorate([
    deco_api_1.type.any,
    deco_api_1.io.all
    // TODO: set the right validation values
], BcfViewpointModel.prototype, "snapshot", void 0);
__decorate([
    deco_api_1.type.object({ keys: {
            selection: componentArrayDefinition,
            coloring: { type: 'array', options: {
                    type: 'object',
                    options: { keys: {
                            color: { type: 'string' },
                            components: componentArrayDefinition
                        } }
                } },
            visibility: { type: 'object', options: {
                    keys: {
                        default_visibility: { type: 'boolean' },
                        exceptions: componentArrayDefinition,
                        view_setup_hints: { type: 'object', options: { keys: {
                                    spaces_visible: { type: 'boolean' },
                                    space_boundaries_visible: { type: 'boolean' },
                                    openings_visible: { type: 'boolean' },
                                } } },
                    }
                } }
        } }),
    deco_api_1.io.all
], BcfViewpointModel.prototype, "components", void 0);
__decorate([
    deco_api_1.type.string,
    deco_api_1.io.all,
    deco_api_1.query.filterable({ type: 'auto' }),
    deco_api_1.query.searchable
], BcfViewpointModel.prototype, "creation_author", void 0);
__decorate([
    deco_api_1.type.string,
    deco_api_1.io.all,
    deco_api_1.query.filterable({ type: 'auto' }),
    deco_api_1.query.searchable
], BcfViewpointModel.prototype, "modified_author", void 0);
BcfViewpointModel = __decorate([
    (0, deco_api_1.model)('bcf_viewpoint')
], BcfViewpointModel);
exports.BcfViewpointModel = BcfViewpointModel;
//# sourceMappingURL=bcf.viewpoint.js.map