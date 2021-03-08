import { BcfProjectActions, BcfTopicActions, BcfCommentActions } from './bcf.enum';
import { Model, ObjectId } from 'deco-api';
export declare class BcfProjectModel extends Model {
    _id: ObjectId;
    appId: ObjectId;
    creation_author: string;
    modified_author: string;
    name: string;
    topic_type: Array<string>;
    topic_status: Array<string>;
    topic_label: Array<string>;
    snippet_type: Array<string>;
    priority: Array<string>;
    user_id_type: Array<string>;
    stage: Array<string>;
    project_actions: Array<BcfProjectActions>;
    topic_actions: Array<BcfTopicActions>;
    comment_actions: Array<BcfCommentActions>;
    output(): Promise<any>;
}
//# sourceMappingURL=bcf.project.d.ts.map