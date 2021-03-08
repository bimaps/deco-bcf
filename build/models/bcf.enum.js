"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BcfTopicStageOptions = exports.BcfTopicPriorityOptions = exports.BcfTopicSnippetTypeOptions = exports.BcfTopicLabelOptions = exports.BcfTopicStatusOptions = exports.BcfTopicTypesOptions = exports.BcfCommentActionsOptions = exports.BcfTopicActionsOptions = exports.BcfProjectActionsOptions = void 0;
exports.BcfProjectActionsOptions = ['update', 'createTopic', 'createDocument', 'updateProjectExtensions'];
exports.BcfTopicActionsOptions = ['update', 'updateBimSnippet', 'updateRelatedTopics', 'updateDocumentReferences', 'updateFiles', 'createComment', 'createViewpoint'];
exports.BcfCommentActionsOptions = ['update'];
/* Topic Enums */
exports.BcfTopicTypesOptions = ['Issue', 'Fault', 'Clash', 'Request', 'Inquiry', 'Remark', 'Undefined'];
exports.BcfTopicStatusOptions = ['Open', 'Closed', 'ReOpened'];
exports.BcfTopicLabelOptions = ['Architecture', 'Electrical', 'Mechanical', 'Specifications', 'Structure', 'Technology', 'Undefined'];
exports.BcfTopicSnippetTypeOptions = ['.ifc', '.csv'];
exports.BcfTopicPriorityOptions = ['Critical', 'Major', 'Normal', 'Minor', 'On hold', 'Undefined'];
exports.BcfTopicStageOptions = ['Stage 1', 'Stage 2'];
//# sourceMappingURL=bcf.enum.js.map