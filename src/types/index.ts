export type NodeType = 'entrance' | 'stall' | 'junction' | 'area' | 'facility';

export interface MapNode {
  id: string;
  x: number;
  y: number;
  type: NodeType;
  label: string;
  area?: string;
}

export interface Edge {
  from: string;
  to: string;
  weight: number;
}

export interface PathResult {
  path: string[];
  totalDistance: number;
  nodes: MapNode[];
}
