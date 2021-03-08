import { BcfProjectActions, BcfTopicActions, BcfCommentActions, BcfTopicActionsOptions, BcfProjectActionsOptions, BcfCommentActionsOptions, BcfTopicTypesOptions, BcfTopicStatusOptions, BcfTopicLabelOptions, BcfTopicSnippetTypeOptions, BcfTopicPriorityOptions, BcfTopicStageOptions } from './bcf.enum';
import { model, Model, type, io, query, validate, ObjectId, AppModel } from 'deco-api';
let debug = require('debug')('app:models:bcp:project');


@model('bcf_project')
export class BcfProjectModel extends Model {

  @type.id
  public _id: ObjectId;

  @type.model({model: AppModel})
  @io.input
  @io.toDocument
  @query.filterable()
  @validate.required
  public appId: ObjectId;

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

  @type.string
  @validate.required
  @io.all
  @query.filterable({type: 'auto'})
  @query.searchable
  public name: string;

  @type.array({type: 'string'})
  @io.all
  public topic_type: Array<string> = BcfTopicTypesOptions;

  @type.array({type: 'string'})
  @io.all
  public topic_status: Array<string> = BcfTopicStatusOptions;

  @type.array({type: 'string'})
  @io.all
  public topic_label: Array<string> = BcfTopicLabelOptions;

  @type.array({type: 'string'})
  @io.all
  public snippet_type: Array<string> = BcfTopicSnippetTypeOptions;

  @type.array({type: 'string'})
  @io.all
  public priority: Array<string> = BcfTopicPriorityOptions;

  @type.array({type: 'string'})
  @io.all
  public user_id_type: Array<string> = [];

  @type.array({type: 'string'})
  @io.all
  public stage: Array<string> = BcfTopicStageOptions;

  @type.select({options: BcfProjectActionsOptions, multiple: true})
  @io.all
  public project_actions: Array<BcfProjectActions> = BcfProjectActionsOptions;

  @type.select({options: BcfTopicActionsOptions, multiple: true})
  @io.all
  public topic_actions: Array<BcfTopicActions> = BcfTopicActionsOptions;

  @type.select({options: BcfCommentActionsOptions, multiple: true})
  @io.all
  public comment_actions: Array<BcfCommentActions> = BcfCommentActionsOptions;

  public output(): Promise<any> {
    return super.output().then((data) => {
      const output: any = {
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

}