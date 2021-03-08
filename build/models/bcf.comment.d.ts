import { Model, ObjectId } from 'deco-api';
import { BcfCommentActions } from './bcf.enum';
export declare class BcfCommentModel extends Model {
    _id: ObjectId;
    appId: ObjectId;
    projectId: ObjectId;
    topicId: ObjectId;
    viewpointId: ObjectId;
    comment: string;
    replyTo: ObjectId;
    creation_author: string;
    modified_author: string;
    comment_actions: Array<BcfCommentActions>;
    output(): Promise<any>;
}
//# sourceMappingURL=bcf.comment.d.ts.map