import { BcfTopicActions } from './bcf.enum';
import { Model, ObjectId } from 'deco-api';
export declare class BcfTopicModel extends Model {
    _id: ObjectId;
    appId: ObjectId;
    projectId: ObjectId;
    topic_type: string;
    topic_status: string;
    reference_links: Array<string>;
    title: string;
    priority: string;
    index: number;
    labels: Array<string>;
    creation_author: string;
    modified_author: string;
    assigned_to: string;
    stage: string;
    description: string;
    due_date: string;
    authorization_topic_actions: Array<BcfTopicActions>;
    authorization_topic_type: Array<string>;
    authorization_topic_status: Array<string>;
    authorization_topic_label: Array<string>;
    authorization_snippet_type: Array<string>;
    authorization_priority: Array<string>;
    authorization_user_id_type: Array<string>;
    authorization_stage: Array<string>;
    output(): Promise<any>;
}
//# sourceMappingURL=bcf.topic.d.ts.map