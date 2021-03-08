import { BcfCommentModel } from '../models/bcf.comment';
import { BcfViewpointModel } from '../models/bcf.viewpoint';
import { BcfTopicModel } from '../models/bcf.topic';
import { BcfProjectModel } from '../models/bcf.project';
import { Request, Response, NextFunction } from "express";
import xml from 'xml';
import AdmZip from 'adm-zip';
import { Query } from 'deco-api';

let debug = require('debug')('app:controller:bcf:export');

export class BcfExportController {

  private project: BcfProjectModel;
  private zip: AdmZip;

  public generateBcfFile() {
    return async (req: Request, res: Response, next: NextFunction) => {
      this.project = res.locals.element;
      this.zip = new AdmZip();
      this.generateProjectBCF();
      this.generateVersion();
      await this.generateTopics();
      //this.zip.writeZip('bcfzip.zip');
      const bufferZip = this.zip.toBuffer();
      res.setHeader('Content-Disposition', 'attachment; filename="' + encodeURIComponent(`${this.project.name}.bcf`) + '"');
      res.write(bufferZip, 'binary');
      res.end(null, 'binary');
      //res.sendStatus(204);
    }
  }

  private generateProjectBCF() {
    let xmlObject = {
      ProjectExtension: [
        {Project: {_attr: {projectId: this.project._id.toString()}}},
        {ExtensionSchema: ''}
      ]
    };
    const xmlString = xml(xmlObject, {indent: '  ', declaration: { encoding: 'UTF-8' }});
    this.zip.addFile('project.bcfp', Buffer.alloc(xmlString.length, xmlString));
  }

  private generateVersion() {
    const fileContent = `<?xml version="1.0" encoding="UTF-8"?>
<Version VersionId="2.1" xsi:noNamespaceSchemaLocation="version.xsd" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
  <DetailedVersion>2.1 KUBUS BV</DetailedVersion>
</Version>`;
    this.zip.addFile('bcf.version', Buffer.alloc(fileContent.length, fileContent));
  }

  private async generateTopics() {
    const topics = await BcfTopicModel.getAll(new Query({projectId: this.project._id}));
    for (let topic of topics) {
      await this.generateTopic(topic);
    }
  }

  private async generateTopic(topic: BcfTopicModel) {
    const viewpoints = await BcfViewpointModel.getAll(new Query({topicId: topic._id}));
    const comments = await BcfCommentModel.getAll(new Query({topicId: topic._id}));

    const commentsXml = comments.map((comment) => {
      let xml: any = {
        Comment: [
          { _attr: {Guid: comment._id.toString()} },
          { Date : comment._createdAt.toISOString()},
          { Author: comment.creation_author},
          { Comment: comment.comment },
          { ModifiedDate: comment._updatedAt.toISOString()},
          { ModifiedAuthor: comment.modified_author }
        ]
      };
      if (comment.replyTo) {
        xml.Comment.push({ ReplyToCommentGuid: comment.replyTo });
      }
      if (comment.viewpointId) {
        xml.Comment.push({ Viewpoint: { _attr: {Guid: comment.viewpointId.toString() }}});
      }
      return xml;
    });

    let moreThanOneViewpoint = false;
    let moreThanOneSnapshot = false;
    const viewpointsXml = viewpoints.map((viewpoint) => {
      const viewpointFileName = moreThanOneViewpoint ? `${viewpoint._id.toString()}_viewpoint.bcfv` : 'viewpoint.bcfv';
      let xml: any = {
        Viewpoints: [
          { _attr: {Guid: viewpoint._id.toString()} },
          { Viewpoint : viewpointFileName}
        ]
      };
      this.generateViewpoint(viewpoint, viewpointFileName);
      moreThanOneViewpoint = true;
      if (viewpoint.snapshot) {
        const snapshotFileName = moreThanOneSnapshot ? `${viewpoint._id.toString()}_snapshot.${viewpoint.snapshot.snapshot_type}` : `snapshot.${viewpoint.snapshot.snapshot_type}`;
        xml.Viewpoints.push({ Snapshot : snapshotFileName})
        this.generateSnapshot(viewpoint, snapshotFileName)
        moreThanOneSnapshot = true;
      }
      return xml;
    });

    const markupXml = {
      Markup: [
        {
          Topic: [
            { _attr: {Guid: topic._id.toString(), TopicType: topic.topic_type, TopicStatus: topic.topic_status}},
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

    const xmlString = xml(markupXml, {indent: '  ', declaration: { encoding: 'UTF-8' }});
    this.zip.addFile(`${topic._id.toString()}/markup.bcp`, Buffer.alloc(xmlString.length, xmlString));
  }

  private generateViewpoint(viewpoint: BcfViewpointModel, filename: string) {
    let viewpointXml: any = {
      VisualizationInfo: [
      ]
    };
    if (viewpoint.components) {
      let componentsXml: any = {
        Components: []
      };
      if (viewpoint.components.visibility && viewpoint.components.visibility.view_setup_hints) {
        let hintsXml = {
          ViewSetupHints: {_attr: {
            SpacesVisible: viewpoint.components.visibility.view_setup_hints.spaces_visible || false,
            SpaceBoundariesVisible: viewpoint.components.visibility.view_setup_hints.space_boundaries_visible || false,
            OpeningsVisible: viewpoint.components.visibility.view_setup_hints.openings_visible || false
          }}
        };
        componentsXml.Components.push(hintsXml);
      }
      if (viewpoint.components.selection) {
        let selectionXml = viewpoint.components.selection.map((component) => {
          let comp: any = { Component: {_attr: {}}};
          if (component.ifc_guid) {
            comp.Component._attr.IfcGuid = component.ifc_guid
          };
          if (component.originating_system) {
            comp.Component._attr.OriginatingSystem = component.originating_system
          };
          if (component.authoring_tool_id) {
            comp.Component._attr.AuthoringToolId = component.authoring_tool_id
          };
          return comp;
        });
        componentsXml.Components.push({Selection: selectionXml});
      }
      if (componentsXml.Components.length) {
        viewpointXml.VisualizationInfo.push({Components: componentsXml.Components});
      }
    }
    const xmlString = xml(viewpointXml, {indent: '  ', declaration: { encoding: 'UTF-8' }});
    this.zip.addFile(`${viewpoint.topicId.toString()}/${filename}`, Buffer.alloc(xmlString.length, xmlString));
  }

  private generateSnapshot(viewpoint: BcfViewpointModel, filename: string) {
    if (!viewpoint.snapshot) return;
    const base64Image = viewpoint.snapshot.snapshot_data.split(';base64,').pop() || '';
    if (!base64Image) return;
    this.zip.addFile(`${viewpoint.topicId.toString()}/${filename}`, Buffer.alloc(base64Image.length, base64Image, 'base64'));
  }

}