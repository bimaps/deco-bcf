import { BcfTopicModel } from './bcf.topic';
import { BcfProjectModel } from './bcf.project';
import { model, Model, type, io, query, validate, ObjectId, AppModel } from 'deco-api';
let debug = require('debug')('app:models:bcf:viewpoint');

const componentArrayDefinition = {type: 'array', options: {
  type: 'object',
  options: {keys: {
    ifc_guid: {type: 'string'},
    originating_system: {type: 'string'},
    authoring_tool_id: {type: 'string'},
  }}
}};


@model('bcf_viewpoint')
export class BcfViewpointModel extends Model {

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

  @type.object({keys: {
    camera_view_point: {type: 'object', required: true, options: {keys: {
      x: {type: 'float', required: true},
      y: {type: 'float', required: true},
      z: {type: 'float', required: true}
    }}},
    camera_direction: {type: 'object', required: true, options: {keys: {
      x: {type: 'float', required: true},
      y: {type: 'float', required: true},
      z: {type: 'float', required: true}
    }}},
    camera_up_vector: {type: 'object', required: true, options: {keys: {
      x: {type: 'float', required: true},
      y: {type: 'float', required: true},
      z: {type: 'float', required: true}
    }}},
    view_to_world_scale: {type: 'float', required: true}
  }})
  @io.all
  public orthogonal_camera?: BcfOrthogonalCamera;

  @type.object({keys: {
    camera_view_point: {type: 'object', required: true, options: {keys: {
      x: {type: 'float', required: true},
      y: {type: 'float', required: true},
      z: {type: 'float', required: true}
    }}},
    camera_direction: {type: 'object', required: true, options: {keys: {
      x: {type: 'float', required: true},
      y: {type: 'float', required: true},
      z: {type: 'float', required: true}
    }}},
    camera_up_vector: {type: 'object', required: true, options: {keys: {
      x: {type: 'float', required: true},
      y: {type: 'float', required: true},
      z: {type: 'float', required: true}
    }}},
    field_of_view: {type: 'float', required: true}
  }})
  @io.all
  public perspective_camera?: BcfPerspectiveCamera;

  @type.array({type: 'object', options: {keys: {
    'start_point': {type: 'object', required: true, options: {keys: {
      x: {type: 'float', required: true},
      y: {type: 'float', required: true},
      z: {type: 'float', required: true}
    }}},
    'end_point': {type: 'object', required: true, options: {keys: {
      x: {type: 'float', required: true},
      y: {type: 'float', required: true},
      z: {type: 'float', required: true}
    }}}
  }}})
  @io.all
  public lines: Array<BcfLine>;

  @type.any
  @io.all
  // TODO: set the right validation values
  public clipping_planes: Array<BcfClippingPlane>;

  @type.any
  @io.all
  // TODO: set the right validation values
  public bitmaps: Array<BcfBitmap>;

  @type.any
  @io.all
  // TODO: set the right validation values
  public snapshot: BcfSnapshot;

  @type.object({keys: {
    selection: componentArrayDefinition,
    coloring: {type: 'array', options: {
      type: 'object',
      options: {keys: {
        color: {type: 'string'},
        components: componentArrayDefinition
      }}
    }},
    visibility: {type: 'object', options: {
      keys: {
        default_visibility: {type: 'boolean'},
        exceptions: componentArrayDefinition,
        view_setup_hints: {type: 'object', options: {keys: {
          spaces_visible: {type: 'boolean'},
          space_boundaries_visible: {type: 'boolean'},
          openings_visible: {type: 'boolean'},
        }}},
      }
    }}
  }})
  @io.all
  public components: BcfComponents;

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

  public output(): Promise<any> {
    return super.output().then((data) => {
      const output = {
        guid: data.id,
        author: data.creation_author,
        creation_author: data.creation_author,
        modified_author: data.modified_author,
        date: data._createdAt,
        creation_date: data._createdAt,
        modified_date: data._updatedAt,
        orthogonal_camera: data.orthogonal_camera,
        perspective_camera: data.perspective_camera,
        lines: data.lines,
        clipping_planes: data.clipping_planes,
        bitmaps: data.bitmaps,
        snapshot: data.snapshot,
        components: data.components,
        topic_guid: data.topicId
      }
      return output;
    });
  }
  
}
export interface BcfPoint {
  x: number;
  y: number;
  z: number;
}

export interface BcfDirection {
  x: number;
  y: number;
  z: number;
}

export interface BcfLine {
  start_point: BcfPoint;
  end_point: BcfPoint;
}

export interface BcfOrthogonalCamera {
  camera_view_point: BcfPoint;
  camera_direction: BcfDirection;
  camera_up_vector: BcfDirection;
  view_to_world_scale: number;
}

export interface BcfPerspectiveCamera {
  camera_view_point: BcfPoint;
  camera_direction: BcfDirection;
  camera_up_vector: BcfDirection;
  field_of_view: number;
}

export interface BcfClippingPlane {
  location: BcfPoint;
  direction: BcfDirection;
}

export interface BcfBitmap {
  bitmap_type: 'png' | 'jpg';
  bitmap_data: string;
  location: BcfPoint;
  normal: BcfDirection;
  up: BcfDirection;
  height: number;
}

export interface BcfSnapshot {
  snapshot_type: 'png' | 'jpb';
  snapshot_data: string;
}

export interface BcfComponents {
  selection?: Array<BcfComponent>;
  coloring?: Array<BcfColoring>;
  visibility?: BcfVisibility;
}

export interface BcfComponent {
  ifc_guid?: string;
  originating_system?: string;
  authoring_tool_id?: string;
}

export interface BcfColoring {
  color: string;
  components: Array<BcfComponent>;
}

export interface BcfVisibility {
  default_visibility?: boolean;
  exceptions?: Array<BcfComponent>;
  view_setup_hints?: BcfViewSetupHints;
}

export interface BcfViewSetupHints {
  spaces_visible?: boolean;
  space_boundaries_visible?: boolean;
  openings_visible?: boolean;
}