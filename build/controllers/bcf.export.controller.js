"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BcfExportController = void 0;
const bcf_comment_1 = require("../models/bcf.comment");
const bcf_viewpoint_1 = require("../models/bcf.viewpoint");
const bcf_topic_1 = require("../models/bcf.topic");
const xml_1 = __importDefault(require("xml"));
const adm_zip_1 = __importDefault(require("adm-zip"));
const deco_api_1 = require("deco-api");
let debug = require('debug')('app:controller:bcf:export');
class BcfExportController {
    generateBcfFile() {
        return (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            this.project = res.locals.element;
            this.zip = new adm_zip_1.default();
            this.generateProjectBCF();
            this.generateVersion();
            yield this.generateTopics();
            //this.zip.writeZip('bcfzip.zip');
            const bufferZip = this.zip.toBuffer();
            res.setHeader('Content-Disposition', 'attachment; filename="' + encodeURIComponent(`${this.project.name}.bcf`) + '"');
            res.write(bufferZip, 'binary');
            res.end(null, 'binary');
            //res.sendStatus(204);
        });
    }
    generateProjectBCF() {
        let xmlObject = {
            ProjectExtension: [
                { Project: { _attr: { projectId: this.project._id.toString() } } },
                { ExtensionSchema: '' }
            ]
        };
        const xmlString = (0, xml_1.default)(xmlObject, { indent: '  ', declaration: { encoding: 'UTF-8' } });
        this.zip.addFile('project.bcfp', Buffer.alloc(xmlString.length, xmlString));
    }
    generateVersion() {
        const fileContent = `<?xml version="1.0" encoding="UTF-8"?>
<Version VersionId="2.1" xsi:noNamespaceSchemaLocation="version.xsd" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
  <DetailedVersion>2.1 KUBUS BV</DetailedVersion>
</Version>`;
        this.zip.addFile('bcf.version', Buffer.alloc(fileContent.length, fileContent));
    }
    generateTopics() {
        return __awaiter(this, void 0, void 0, function* () {
            const topics = yield bcf_topic_1.BcfTopicModel.getAll(new deco_api_1.Query({ projectId: this.project._id }));
            for (let topic of topics) {
                yield this.generateTopic(topic);
            }
        });
    }
    generateTopic(topic) {
        return __awaiter(this, void 0, void 0, function* () {
            const viewpoints = yield bcf_viewpoint_1.BcfViewpointModel.getAll(new deco_api_1.Query({ topicId: topic._id }));
            const comments = yield bcf_comment_1.BcfCommentModel.getAll(new deco_api_1.Query({ topicId: topic._id }));
            const commentsXml = comments.map((comment) => {
                let xml = {
                    Comment: [
                        { _attr: { Guid: comment._id.toString() } },
                        { Date: comment._createdAt.toISOString() },
                        { Author: comment.creation_author },
                        { Comment: comment.comment },
                        { ModifiedDate: comment._updatedAt.toISOString() },
                        { ModifiedAuthor: comment.modified_author }
                    ]
                };
                if (comment.replyTo) {
                    xml.Comment.push({ ReplyToCommentGuid: comment.replyTo });
                }
                if (comment.viewpointId) {
                    xml.Comment.push({ Viewpoint: { _attr: { Guid: comment.viewpointId.toString() } } });
                }
                return xml;
            });
            let moreThanOneViewpoint = false;
            let moreThanOneSnapshot = false;
            const viewpointsXml = viewpoints.map((viewpoint) => {
                const viewpointFileName = moreThanOneViewpoint ? `${viewpoint._id.toString()}_viewpoint.bcfv` : 'viewpoint.bcfv';
                let xml = {
                    Viewpoints: [
                        { _attr: { Guid: viewpoint._id.toString() } },
                        { Viewpoint: viewpointFileName }
                    ]
                };
                this.generateViewpoint(viewpoint, viewpointFileName);
                moreThanOneViewpoint = true;
                if (viewpoint.snapshot) {
                    const snapshotFileName = moreThanOneSnapshot ? `${viewpoint._id.toString()}_snapshot.${viewpoint.snapshot.snapshot_type}` : `snapshot.${viewpoint.snapshot.snapshot_type}`;
                    xml.Viewpoints.push({ Snapshot: snapshotFileName });
                    this.generateSnapshot(viewpoint, snapshotFileName);
                    moreThanOneSnapshot = true;
                }
                return xml;
            });
            const markupXml = {
                Markup: [
                    {
                        Topic: [
                            { _attr: { Guid: topic._id.toString(), TopicType: topic.topic_type, TopicStatus: topic.topic_status } },
                            { Title: topic.title },
                            { Priority: topic.priority },
                            { Index: topic.index },
                            { CreationDate: topic._createdAt.toISOString() },
                            { CreationAuthor: topic.creation_author },
                            { ModifiedDate: topic._updatedAt.toISOString() },
                            { ModifiedAuthor: topic.modified_author },
                            { DueDate: topic.due_date },
                            { AssignedTo: topic.assigned_to },
                            { Description: topic.description },
                            { Stage: topic.stage },
                            { ReferenceLinks: topic.reference_links },
                            { Labels: topic.labels }
                        ]
                    },
                ].concat(commentsXml).concat(viewpointsXml)
            };
            const xmlString = (0, xml_1.default)(markupXml, { indent: '  ', declaration: { encoding: 'UTF-8' } });
            this.zip.addFile(`${topic._id.toString()}/markup.bcp`, Buffer.alloc(xmlString.length, xmlString));
        });
    }
    generateViewpoint(viewpoint, filename) {
        let viewpointXml = {
            VisualizationInfo: []
        };
        if (viewpoint.components) {
            let componentsXml = {
                Components: []
            };
            if (viewpoint.components.visibility && viewpoint.components.visibility.view_setup_hints) {
                let hintsXml = {
                    ViewSetupHints: { _attr: {
                            SpacesVisible: viewpoint.components.visibility.view_setup_hints.spaces_visible || false,
                            SpaceBoundariesVisible: viewpoint.components.visibility.view_setup_hints.space_boundaries_visible || false,
                            OpeningsVisible: viewpoint.components.visibility.view_setup_hints.openings_visible || false
                        } }
                };
                componentsXml.Components.push(hintsXml);
            }
            if (viewpoint.components.selection) {
                let selectionXml = viewpoint.components.selection.map((component) => {
                    let comp = { Component: { _attr: {} } };
                    if (component.ifc_guid) {
                        comp.Component._attr.IfcGuid = component.ifc_guid;
                    }
                    ;
                    if (component.originating_system) {
                        comp.Component._attr.OriginatingSystem = component.originating_system;
                    }
                    ;
                    if (component.authoring_tool_id) {
                        comp.Component._attr.AuthoringToolId = component.authoring_tool_id;
                    }
                    ;
                    return comp;
                });
                componentsXml.Components.push({ Selection: selectionXml });
            }
            if (componentsXml.Components.length) {
                viewpointXml.VisualizationInfo.push({ Components: componentsXml.Components });
            }
        }
        const xmlString = (0, xml_1.default)(viewpointXml, { indent: '  ', declaration: { encoding: 'UTF-8' } });
        this.zip.addFile(`${viewpoint.topicId.toString()}/${filename}`, Buffer.alloc(xmlString.length, xmlString));
    }
    generateSnapshot(viewpoint, filename) {
        if (!viewpoint.snapshot)
            return;
        const base64Image = viewpoint.snapshot.snapshot_data.split(';base64,').pop() || '';
        if (!base64Image)
            return;
        this.zip.addFile(`${viewpoint.topicId.toString()}/${filename}`, Buffer.alloc(base64Image.length, base64Image, 'base64'));
    }
}
exports.BcfExportController = BcfExportController;
//# sourceMappingURL=bcf.export.controller.js.map