import { BcfTopicActions } from './bcf.enum';
import { BcfTopicActionsOptions } from './bcf.enum';
import { BcfProjectModel } from './bcf.project';
import { model, Model, type, io, query, validate, ObjectId, AppModel} from 'deco-api';
let debug = require('debug')('app:models:bcf:topic');


@model('bcf_topic')
export class BcfTopicModel extends Model {

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

  @type.string
  @io.all
  @query.filterable({type: 'auto'})
  @query.searchable
  public topic_type: string;

  @type.string
  @io.all
  @query.filterable({type: 'auto'})
  @query.searchable
  public topic_status: string;

  @type.array({type: 'string'})
  @io.all 
  public reference_links: Array<string>;

  @type.string
  @validate.required
  @io.all
  @query.filterable({type: 'auto'})
  @query.searchable
  public title: string;

  @type.string
  @io.all
  @query.filterable({type: 'auto'})
  @query.searchable
  public priority: string;

  @type.integer
  @io.all
  public index: number;

  @type.array({type: 'string'})
  @io.all
  public labels: Array<string>;

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
  @io.all
  @query.filterable({type: 'auto'})
  @query.searchable
  public assigned_to: string;

  @type.string
  @io.all
  @query.filterable({type: 'auto'})
  @query.searchable
  public stage: string;

  @type.string
  @io.all
  @query.filterable({type: 'auto'})
  @query.searchable
  public description: string;

  @type.string
  @io.all
  @query.filterable({type: 'auto'})
  @query.searchable
  public due_date: string;

  @type.select({options: BcfTopicActionsOptions, multiple: true})
  @io.all
  public authorization_topic_actions: Array<BcfTopicActions> = BcfTopicActionsOptions;

  @type.array({type: 'string'})
  @io.all
  public authorization_topic_type: Array<string> = [];

  @type.array({type: 'string'})
  @io.all
  public authorization_topic_status: Array<string> = [];

  @type.array({type: 'string'})
  @io.all
  public authorization_topic_label: Array<string> = [];

  @type.array({type: 'string'})
  @io.all
  public authorization_snippet_type: Array<string> = [];

  @type.array({type: 'string'})
  @io.all
  public authorization_priority: Array<string> = [];

  @type.array({type: 'string'})
  @io.all
  public authorization_user_id_type: Array<string> = [];

  @type.array({type: 'string'})
  @io.all
  public authorization_stage: Array<string> = [];

  public output(): Promise<any> {
    return super.output().then((data) => {
      const output: any = {
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
      }
      if (this.request.query.includeAuthorization === 'true') {
        output.authorization = {
        };
        if (data.authorization_topic_actions?.length) output.authorization.topic_actions = data.authorization_topic_actions;
        if (data.authorization_topic_type?.length) output.authorization.topic_type = data.authorization_topic_type;
        if (data.authorization_topic_status?.length) output.authorization.topic_status = data.authorization_topic_status;
        if (data.authorization_topic_label?.length) output.authorization.topic_label = data.authorization_topic_label;
        if (data.authorization_snippet_type?.length) output.authorization.snippet_type = data.authorization_snippet_type;
        if (data.authorization_priority?.length) output.authorization.priority = data.authorization_priority;
        if (data.authorization_user_id_type?.length) output.authorization.user_id_type = data.authorization_user_id_type;
        if (data.authorization_stage?.length) output.authorization.stage = data.authorization_stage;
      }
      return output;
    });
  }
  
}