import { BcfCommentActionsOptions } from './bcf.enum';
import { BcfViewpointModel } from './bcf.viewpoint';
import { BcfTopicModel } from './bcf.topic';
import { BcfProjectModel } from './bcf.project';
import { model, Model, type, io, query, validate, ObjectId, AppModel } from 'deco-api';
import { BcfCommentActions } from './bcf.enum';
let debug = require('debug')('app:models:bcf:comment');


@model('bcf_comment')
export class BcfCommentModel extends Model {

  @type.id
  public _id: ObjectId;

  @type.model({model: AppModel})
  @io.input
  @io.toDocument
  @query.filterable()
  @validate.required
  public appId: ObjectId;

  @type.model({model: BcfProjectModel})
  @io.input
  @io.toDocument
  @query.filterable()
  @validate.required
  public projectId: ObjectId;

  @type.model({model: BcfTopicModel})
  @io.all
  @query.filterable()
  @validate.required
  public topicId: ObjectId;

  @type.model({model: BcfViewpointModel})
  @io.all
  @query.filterable()
  public viewpointId: ObjectId;

  @type.string
  @io.all
  @query.filterable({type: 'auto'})
  @query.searchable
  public comment: string;

  @type.model({model: 'self'})
  @io.all
  @query.filterable()
  public replyTo: ObjectId;

  @type.string
  @io.all
  @query.filterable({type: 'auto'})
  @query.searchable
  public creation_author: string;

  @type.string
  @io.all
  @query.filterable({type: 'auto'})
  @query.searchable
  public modified_author: string;

  @type.select({options: BcfCommentActionsOptions, multiple: true})
  @io.all
  public comment_actions: Array<BcfCommentActions> = BcfCommentActionsOptions;

  public output(): Promise<any> {
    return super.output().then((data) => {
      const output: any = {
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
      }
      if (this.request.query.includeAuthorization === 'true') {
        output.authorization = {
        };
        if (data.authorization_comment_actions?.length) output.authorization.comment_actions = data.authorization_comment_actions;
      }
      return output;
    });
  }
  
}