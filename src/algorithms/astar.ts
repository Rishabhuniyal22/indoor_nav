import { MapNode, Edge, PathResult } from '../types';

interface AStarNode {
  id: string;
  g: number;
  h: number;
  f: number;
  parent: string | null;
}

function heuristic(a: MapNode, b: MapNode): number {
  return Math.sqrt(Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2));
}

export function findPath(
  startId: string,
  endId: string,
  nodes: MapNode[],
  edges: Edge[]
): PathResult | null {
  const nodeMap = new Map<string, MapNode>();
  nodes.forEach(n => nodeMap.set(n.id, n));

  const adjacency = new Map<string, { to: string; weight: number }[]>();
  nodes.forEach(n => adjacency.set(n.id, []));
  edges.forEach(e => {
    adjacency.get(e.from)?.push({ to: e.to, weight: e.weight });
    adjacency.get(e.to)?.push({ to: e.from, weight: e.weight });
  });

  const startNode = nodeMap.get(startId);
  const endNode = nodeMap.get(endId);
  if (!startNode || !endNode) return null;

  const openSet = new Map<string, AStarNode>();
  const closedMap = new Map<string, AStarNode>();

  const h0 = heuristic(startNode, endNode);
  openSet.set(startId, { id: startId, g: 0, h: h0, f: h0, parent: null });

  while (openSet.size > 0) {
    let current: AStarNode | null = null;
    for (const node of openSet.values()) {
      if (current === null || node.f < current.f) current = node;
    }
    if (!current) break;

    if (current.id === endId) {
      const path: string[] = [];
      let cur: AStarNode | null = current;
      while (cur !== null) {
        path.unshift(cur.id);
        if (cur.parent === null) break;
        cur = closedMap.get(cur.parent) || openSet.get(cur.parent) || null;
      }
      const pathNodes = path
        .map(id => nodeMap.get(id))
        .filter((n): n is MapNode => n !== undefined);
      return { path, totalDistance: current.g, nodes: pathNodes };
    }

    openSet.delete(current.id);
    closedMap.set(current.id, current);

    const neighbors = adjacency.get(current.id) || [];
    for (const neighbor of neighbors) {
      if (closedMap.has(neighbor.to)) continue;
      const neighborNode = nodeMap.get(neighbor.to);
      if (!neighborNode) continue;
      const tentativeG = current.g + neighbor.weight;
      const existing = openSet.get(neighbor.to);
      if (!existing || tentativeG < existing.g) {
        const h = heuristic(neighborNode, endNode);
        openSet.set(neighbor.to, {
          id: neighbor.to, g: tentativeG, h, f: tentativeG + h, parent: current.id,
        });
      }
    }
  }

  return null;
}
