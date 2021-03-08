/* Actions */
export type BcfProjectActions = 'update' | 'createTopic' | 'createDocument' | 'updateProjectExtensions';
export let BcfProjectActionsOptions: Array<BcfProjectActions> = ['update', 'createTopic', 'createDocument', 'updateProjectExtensions'];

export type BcfTopicActions = 'update' | 'updateBimSnippet' | 'updateRelatedTopics' | 'updateDocumentReferences' | 'updateFiles' | 'createComment' | 'createViewpoint';
export let BcfTopicActionsOptions: Array<BcfTopicActions> = ['update', 'updateBimSnippet', 'updateRelatedTopics', 'updateDocumentReferences', 'updateFiles', 'createComment', 'createViewpoint'];

export type BcfCommentActions = 'update';
export let BcfCommentActionsOptions: Array<BcfCommentActions> = ['update'];

/* Topic Enums */
export let BcfTopicTypesOptions: Array<string> = ['Issue', 'Fault', 'Clash', 'Request', 'Inquiry', 'Remark', 'Undefined'];
export let BcfTopicStatusOptions: Array<string> = ['Open', 'Closed', 'ReOpened'];
export let BcfTopicLabelOptions: Array<string> = ['Architecture', 'Electrical', 'Mechanical', 'Specifications', 'Structure', 'Technology', 'Undefined'];
export let BcfTopicSnippetTypeOptions: Array<string> = ['.ifc', '.csv'];
export let BcfTopicPriorityOptions: Array<string> = ['Critical', 'Major', 'Normal', 'Minor', 'On hold', 'Undefined'];
export let BcfTopicStageOptions: Array<string> = ['Stage 1', 'Stage 2'];


