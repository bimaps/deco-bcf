import { Model, ObjectId } from 'deco-api';
export declare class BcfViewpointModel extends Model {
    _id: ObjectId;
    appId: ObjectId;
    projectId: ObjectId;
    topicId: ObjectId;
    orthogonal_camera?: BcfOrthogonalCamera;
    perspective_camera?: BcfPerspectiveCamera;
    lines: Array<BcfLine>;
    clipping_planes: Array<BcfClippingPlane>;
    bitmaps: Array<BcfBitmap>;
    snapshot: BcfSnapshot;
    components: BcfComponents;
    creation_author: string;
    modified_author: string;
    output(): Promise<any>;
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
export interface BcfOrthogonalCamera {
    camera_view_point: BcfPoint;
    camera_direction: BcfDirection;
    camera_up_vector: BcfDirection;
    view_to_world_scale: number;
}
export interface BcfPerspectiveCamera {
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
    snapshot_type: 'png' | 'jpb';
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
//# sourceMappingURL=bcf.viewpoint.d.ts.map