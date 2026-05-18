import { MapNode, Edge } from '../types';

// SVG canvas: 1400 x 800
// Layout matches the floor plan image exactly:
// - Entrance at bottom-left
// - Coffee Area at top-left
// - Book Stalls Area (S1-S38) at top-center/right
// - Event Area at center-right bottom
// - NBT Office at bottom-right

export const nodes: MapNode[] = [
  // ── ENTRANCE ──
  { id: 'entrance', x: 250, y: 720, type: 'entrance', label: 'Entrance', area: 'Entrance' },

  // ── MAIN CORRIDOR JUNCTIONS ──
  { id: 'j-entry-1', x: 250, y: 640, type: 'junction', label: 'Junction', area: 'Corridor' },
  { id: 'j-entry-2', x: 430, y: 640, type: 'junction', label: 'Junction', area: 'Corridor' },
  { id: 'j-main-left', x: 430, y: 560, type: 'junction', label: 'Junction', area: 'Corridor' },
  { id: 'j-main-right', x: 620, y: 560, type: 'junction', label: 'Junction', area: 'Corridor' },
  { id: 'j-mid-left', x: 430, y: 460, type: 'junction', label: 'Junction', area: 'Corridor' },
  { id: 'j-mid-right', x: 620, y: 460, type: 'junction', label: 'Junction', area: 'Corridor' },

  // ── COFFEE AREA ──
  { id: 'coffee-area', x: 130, y: 200, type: 'area', label: 'Coffee Area', area: 'Coffee Area' },
  { id: 'coffee-machine', x: 130, y: 270, type: 'facility', label: 'Coffee Machine', area: 'Coffee Area' },
  { id: 'j-coffee', x: 250, y: 460, type: 'junction', label: 'Junction', area: 'Corridor' },

  // ── NBT OFFICE ──
  { id: 'nbt-office', x: 1020, y: 680, type: 'facility', label: 'NBT Office', area: 'NBT Office' },
  { id: 'j-nbt', x: 860, y: 640, type: 'junction', label: 'Junction', area: 'Corridor' },
  { id: 'j-nbt-entry', x: 1020, y: 640, type: 'junction', label: 'Junction', area: 'Corridor' },

  // ── EVENT AREA ──
  { id: 'event-area', x: 860, y: 520, type: 'area', label: 'Event Area', area: 'Event Area' },
  { id: 'j-event-left', x: 620, y: 640, type: 'junction', label: 'Junction', area: 'Corridor' },
  { id: 'j-event-top', x: 620, y: 460, type: 'junction', label: 'Junction', area: 'Corridor' },

  // ── BOOK STALLS AREA entry junctions ──
  { id: 'j-stalls-entry', x: 430, y: 380, type: 'junction', label: 'Junction', area: 'Book Stalls' },
  { id: 'j-stalls-mid', x: 620, y: 380, type: 'junction', label: 'Junction', area: 'Book Stalls' },
  { id: 'j-stalls-right', x: 1280, y: 380, type: 'junction', label: 'Junction', area: 'Book Stalls' },

  // ── ROW 1 (S1–S10) ── y=360
  { id: 'S1',  x: 560,  y: 360, type: 'stall', label: 'S1',  area: 'Book Stalls' },
  { id: 'S2',  x: 640,  y: 360, type: 'stall', label: 'S2',  area: 'Book Stalls' },
  { id: 'S3',  x: 720,  y: 360, type: 'stall', label: 'S3',  area: 'Book Stalls' },
  { id: 'S4',  x: 800,  y: 360, type: 'stall', label: 'S4',  area: 'Book Stalls' },
  { id: 'S5',  x: 880,  y: 360, type: 'stall', label: 'S5',  area: 'Book Stalls' },
  { id: 'S6',  x: 960,  y: 360, type: 'stall', label: 'S6',  area: 'Book Stalls' },
  { id: 'S7',  x: 1040, y: 360, type: 'stall', label: 'S7',  area: 'Book Stalls' },
  { id: 'S8',  x: 1120, y: 360, type: 'stall', label: 'S8',  area: 'Book Stalls' },
  { id: 'S9',  x: 1200, y: 360, type: 'stall', label: 'S9',  area: 'Book Stalls' },
  { id: 'S10', x: 1280, y: 360, type: 'stall', label: 'S10', area: 'Book Stalls' },

  // ── ROW 1 AISLE JUNCTION ── y=380 between rows
  { id: 'j-r1-left',  x: 560,  y: 380, type: 'junction', label: '', area: 'Book Stalls' },
  { id: 'j-r1-right', x: 1280, y: 380, type: 'junction', label: '', area: 'Book Stalls' },

  // ── ROW 2 (S11–S20) ── y=300
  { id: 'S11', x: 560,  y: 300, type: 'stall', label: 'S11', area: 'Book Stalls' },
  { id: 'S12', x: 640,  y: 300, type: 'stall', label: 'S12', area: 'Book Stalls' },
  { id: 'S13', x: 720,  y: 300, type: 'stall', label: 'S13', area: 'Book Stalls' },
  { id: 'S14', x: 800,  y: 300, type: 'stall', label: 'S14', area: 'Book Stalls' },
  { id: 'S15', x: 880,  y: 300, type: 'stall', label: 'S15', area: 'Book Stalls' },
  { id: 'S16', x: 960,  y: 300, type: 'stall', label: 'S16', area: 'Book Stalls' },
  { id: 'S17', x: 1040, y: 300, type: 'stall', label: 'S17', area: 'Book Stalls' },
  { id: 'S18', x: 1120, y: 300, type: 'stall', label: 'S18', area: 'Book Stalls' },
  { id: 'S19', x: 1200, y: 300, type: 'stall', label: 'S19', area: 'Book Stalls' },
  { id: 'S20', x: 1280, y: 300, type: 'stall', label: 'S20', area: 'Book Stalls' },

  // ── ROW 2 AISLE ──
  { id: 'j-r2-left',  x: 560,  y: 320, type: 'junction', label: '', area: 'Book Stalls' },
  { id: 'j-r2-right', x: 1280, y: 320, type: 'junction', label: '', area: 'Book Stalls' },

  // ── ROW 3 (S21–S30) ── y=240
  { id: 'S21', x: 560,  y: 240, type: 'stall', label: 'S21', area: 'Book Stalls' },
  { id: 'S22', x: 640,  y: 240, type: 'stall', label: 'S22', area: 'Book Stalls' },
  { id: 'S23', x: 720,  y: 240, type: 'stall', label: 'S23', area: 'Book Stalls' },
  { id: 'S24', x: 800,  y: 240, type: 'stall', label: 'S24', area: 'Book Stalls' },
  { id: 'S25', x: 880,  y: 240, type: 'stall', label: 'S25', area: 'Book Stalls' },
  { id: 'S26', x: 960,  y: 240, type: 'stall', label: 'S26', area: 'Book Stalls' },
  { id: 'S27', x: 1040, y: 240, type: 'stall', label: 'S27', area: 'Book Stalls' },
  { id: 'S28', x: 1120, y: 240, type: 'stall', label: 'S28', area: 'Book Stalls' },
  { id: 'S29', x: 1200, y: 240, type: 'stall', label: 'S29', area: 'Book Stalls' },
  { id: 'S30', x: 1280, y: 240, type: 'stall', label: 'S30', area: 'Book Stalls' },

  // ── ROW 3 AISLE ──
  { id: 'j-r3-left',  x: 560,  y: 260, type: 'junction', label: '', area: 'Book Stalls' },
  { id: 'j-r3-right', x: 1280, y: 260, type: 'junction', label: '', area: 'Book Stalls' },

  // ── ROW 4 (S31–S34 + S35–S38 vertical on left) ── y=160
  { id: 'S31', x: 560,  y: 160, type: 'stall', label: 'S31', area: 'Book Stalls' },
  { id: 'S32', x: 640,  y: 160, type: 'stall', label: 'S32', area: 'Book Stalls' },
  { id: 'S33', x: 720,  y: 160, type: 'stall', label: 'S33', area: 'Book Stalls' },
  { id: 'S34', x: 800,  y: 160, type: 'stall', label: 'S34', area: 'Book Stalls' },

  // ── S35–S38 vertical column (left side of Book Stalls) ──
  { id: 'S35', x: 490,  y: 110, type: 'stall', label: 'S35', area: 'Book Stalls' },
  { id: 'S36', x: 490,  y: 160, type: 'stall', label: 'S36', area: 'Book Stalls' },
  { id: 'S37', x: 490,  y: 215, type: 'stall', label: 'S37', area: 'Book Stalls' },
  { id: 'S38', x: 490,  y: 270, type: 'stall', label: 'S38', area: 'Book Stalls' },

  // ── ROW 4 AISLE ──
  { id: 'j-r4-left',  x: 560,  y: 180, type: 'junction', label: '', area: 'Book Stalls' },
  { id: 'j-r4-right', x: 800,  y: 180, type: 'junction', label: '', area: 'Book Stalls' },

  // ── Horizontal aisle connectors per row (at stall y positions) ──
  // Row 1 aisle (y=380)
  { id: 'a1-560',  x: 560,  y: 380, type: 'junction', label: '', area: 'Book Stalls' },
  { id: 'a1-640',  x: 640,  y: 380, type: 'junction', label: '', area: 'Book Stalls' },
  { id: 'a1-720',  x: 720,  y: 380, type: 'junction', label: '', area: 'Book Stalls' },
  { id: 'a1-800',  x: 800,  y: 380, type: 'junction', label: '', area: 'Book Stalls' },
  { id: 'a1-880',  x: 880,  y: 380, type: 'junction', label: '', area: 'Book Stalls' },
  { id: 'a1-960',  x: 960,  y: 380, type: 'junction', label: '', area: 'Book Stalls' },
  { id: 'a1-1040', x: 1040, y: 380, type: 'junction', label: '', area: 'Book Stalls' },
  { id: 'a1-1120', x: 1120, y: 380, type: 'junction', label: '', area: 'Book Stalls' },
  { id: 'a1-1200', x: 1200, y: 380, type: 'junction', label: '', area: 'Book Stalls' },

  // Row 2 aisle (y=320)
  { id: 'a2-560',  x: 560,  y: 320, type: 'junction', label: '', area: 'Book Stalls' },
  { id: 'a2-640',  x: 640,  y: 320, type: 'junction', label: '', area: 'Book Stalls' },
  { id: 'a2-720',  x: 720,  y: 320, type: 'junction', label: '', area: 'Book Stalls' },
  { id: 'a2-800',  x: 800,  y: 320, type: 'junction', label: '', area: 'Book Stalls' },
  { id: 'a2-880',  x: 880,  y: 320, type: 'junction', label: '', area: 'Book Stalls' },
  { id: 'a2-960',  x: 960,  y: 320, type: 'junction', label: '', area: 'Book Stalls' },
  { id: 'a2-1040', x: 1040, y: 320, type: 'junction', label: '', area: 'Book Stalls' },
  { id: 'a2-1120', x: 1120, y: 320, type: 'junction', label: '', area: 'Book Stalls' },
  { id: 'a2-1200', x: 1200, y: 320, type: 'junction', label: '', area: 'Book Stalls' },

  // Row 3 aisle (y=260)
  { id: 'a3-560',  x: 560,  y: 260, type: 'junction', label: '', area: 'Book Stalls' },
  { id: 'a3-640',  x: 640,  y: 260, type: 'junction', label: '', area: 'Book Stalls' },
  { id: 'a3-720',  x: 720,  y: 260, type: 'junction', label: '', area: 'Book Stalls' },
  { id: 'a3-800',  x: 800,  y: 260, type: 'junction', label: '', area: 'Book Stalls' },
  { id: 'a3-880',  x: 880,  y: 260, type: 'junction', label: '', area: 'Book Stalls' },
  { id: 'a3-960',  x: 960,  y: 260, type: 'junction', label: '', area: 'Book Stalls' },
  { id: 'a3-1040', x: 1040, y: 260, type: 'junction', label: '', area: 'Book Stalls' },
  { id: 'a3-1120', x: 1120, y: 260, type: 'junction', label: '', area: 'Book Stalls' },
  { id: 'a3-1200', x: 1200, y: 260, type: 'junction', label: '', area: 'Book Stalls' },

  // Row 4 aisle (y=180)
  { id: 'a4-560',  x: 560,  y: 180, type: 'junction', label: '', area: 'Book Stalls' },
  { id: 'a4-640',  x: 640,  y: 180, type: 'junction', label: '', area: 'Book Stalls' },
  { id: 'a4-720',  x: 720,  y: 180, type: 'junction', label: '', area: 'Book Stalls' },
  { id: 'a4-800',  x: 800,  y: 180, type: 'junction', label: '', area: 'Book Stalls' },

  // S35-38 column aisle
  { id: 'a-s35', x: 490, y: 110, type: 'junction', label: '', area: 'Book Stalls' },
  { id: 'a-s36', x: 490, y: 160, type: 'junction', label: '', area: 'Book Stalls' },
  { id: 'a-s37', x: 490, y: 215, type: 'junction', label: '', area: 'Book Stalls' },
  { id: 'a-s38', x: 490, y: 270, type: 'junction', label: '', area: 'Book Stalls' },
];

function dist(ax: number, ay: number, bx: number, by: number): number {
  return Math.round(Math.sqrt(Math.pow(ax - bx, 2) + Math.pow(ay - by, 2)));
}

function edgeBetween(a: MapNode, b: MapNode): Edge {
  return { from: a.id, to: b.id, weight: dist(a.x, a.y, b.x, b.y) };
}

function nodeById(id: string): MapNode {
  const n = nodes.find(n => n.id === id);
  if (!n) throw new Error(`Node ${id} not found`);
  return n;
}

function e(fromId: string, toId: string): Edge {
  const a = nodeById(fromId);
  const b = nodeById(toId);
  return edgeBetween(a, b);
}

export const edges: Edge[] = [
  // ── ENTRANCE & MAIN CORRIDORS ──
  e('entrance', 'j-entry-1'),
  e('j-entry-1', 'j-entry-2'),
  e('j-entry-2', 'j-main-left'),
  e('j-main-left', 'j-mid-left'),
  e('j-mid-left', 'j-coffee'),
  e('j-coffee', 'coffee-area'),
  e('coffee-area', 'coffee-machine'),
  e('j-main-left', 'j-main-right'),
  e('j-main-right', 'j-event-left'),
  e('j-event-left', 'j-nbt'),
  e('j-nbt', 'j-nbt-entry'),
  e('j-nbt-entry', 'nbt-office'),
  e('j-entry-2', 'j-event-left'),  // bottom corridor
  e('j-main-right', 'j-mid-right'),
  e('j-mid-right', 'j-event-top'),
  e('j-event-top', 'event-area'),
  e('j-nbt', 'event-area'),

  // ── INTO BOOK STALLS ──
  e('j-mid-left', 'j-stalls-entry'),
  e('j-stalls-entry', 'j-stalls-mid'),
  e('j-stalls-mid', 'j-stalls-right'),

  // ── ROW 1 AISLE (y=380) ──
  // Connect stalls-entry to row 1 aisle
  e('j-stalls-entry', 'a1-560'),
  // Aisle horizontal
  e('a1-560', 'a1-640'),
  e('a1-640', 'a1-720'),
  e('a1-720', 'a1-800'),
  e('a1-800', 'a1-880'),
  e('a1-880', 'a1-960'),
  e('a1-960', 'a1-1040'),
  e('a1-1040', 'a1-1120'),
  e('a1-1120', 'a1-1200'),
  e('a1-1200', 'j-r1-right'),
  // Stalls connect to aisle
  e('S1',  'a1-560'),
  e('S2',  'a1-640'),
  e('S3',  'a1-720'),
  e('S4',  'a1-800'),
  e('S5',  'a1-880'),
  e('S6',  'a1-960'),
  e('S7',  'a1-1040'),
  e('S8',  'a1-1120'),
  e('S9',  'a1-1200'),
  e('S10', 'j-r1-right'),

  // ── BETWEEN ROW 1 AND ROW 2 ──
  // Vertical connectors at each column
  e('a1-560',  'a2-560'),
  e('a1-640',  'a2-640'),
  e('a1-720',  'a2-720'),
  e('a1-800',  'a2-800'),
  e('a1-880',  'a2-880'),
  e('a1-960',  'a2-960'),
  e('a1-1040', 'a2-1040'),
  e('a1-1120', 'a2-1120'),
  e('a1-1200', 'a2-1200'),
  e('j-r1-right', 'j-r2-right'),

  // ── ROW 2 AISLE (y=320) ──
  e('a2-560', 'a2-640'),
  e('a2-640', 'a2-720'),
  e('a2-720', 'a2-800'),
  e('a2-800', 'a2-880'),
  e('a2-880', 'a2-960'),
  e('a2-960', 'a2-1040'),
  e('a2-1040', 'a2-1120'),
  e('a2-1120', 'a2-1200'),
  e('a2-1200', 'j-r2-right'),
  // Stalls
  e('S11', 'a2-560'),
  e('S12', 'a2-640'),
  e('S13', 'a2-720'),
  e('S14', 'a2-800'),
  e('S15', 'a2-880'),
  e('S16', 'a2-960'),
  e('S17', 'a2-1040'),
  e('S18', 'a2-1120'),
  e('S19', 'a2-1200'),
  e('S20', 'j-r2-right'),

  // ── BETWEEN ROW 2 AND ROW 3 ──
  e('a2-560',  'a3-560'),
  e('a2-640',  'a3-640'),
  e('a2-720',  'a3-720'),
  e('a2-800',  'a3-800'),
  e('a2-880',  'a3-880'),
  e('a2-960',  'a3-960'),
  e('a2-1040', 'a3-1040'),
  e('a2-1120', 'a3-1120'),
  e('a2-1200', 'a3-1200'),
  e('j-r2-right', 'j-r3-right'),

  // ── ROW 3 AISLE (y=260) ──
  e('a3-560', 'a3-640'),
  e('a3-640', 'a3-720'),
  e('a3-720', 'a3-800'),
  e('a3-800', 'a3-880'),
  e('a3-880', 'a3-960'),
  e('a3-960', 'a3-1040'),
  e('a3-1040', 'a3-1120'),
  e('a3-1120', 'a3-1200'),
  e('a3-1200', 'j-r3-right'),
  // Stalls
  e('S21', 'a3-560'),
  e('S22', 'a3-640'),
  e('S23', 'a3-720'),
  e('S24', 'a3-800'),
  e('S25', 'a3-880'),
  e('S26', 'a3-960'),
  e('S27', 'a3-1040'),
  e('S28', 'a3-1120'),
  e('S29', 'a3-1200'),
  e('S30', 'j-r3-right'),

  // ── BETWEEN ROW 3 AND ROW 4 ──
  e('a3-560',  'a4-560'),
  e('a3-640',  'a4-640'),
  e('a3-720',  'a4-720'),
  e('a3-800',  'a4-800'),

  // ── ROW 4 AISLE (y=180) ──
  e('a4-560', 'a4-640'),
  e('a4-640', 'a4-720'),
  e('a4-720', 'a4-800'),
  // Stalls
  e('S31', 'a4-560'),
  e('S32', 'a4-640'),
  e('S33', 'a4-720'),
  e('S34', 'a4-800'),

  // ── S35-S38 COLUMN (x=490) ──
  e('a-s35', 'a-s36'),
  e('a-s36', 'a-s37'),
  e('a-s37', 'a-s38'),
  e('S35', 'a-s35'),
  e('S36', 'a-s36'),
  e('S37', 'a-s37'),
  e('S38', 'a-s38'),
  // Connect column to main aisle
  e('a-s38', 'a3-560'),
  e('a-s37', 'a2-560'),
  e('a4-560', 'a-s36'),
  e('a-s35', 'a4-560'),
];

// Deduplicate nodes (remove duplicates from the aisle nodes that have same ids as j-r* nodes)
const uniqueNodeIds = new Set<string>();
export const deduplicatedNodes: MapNode[] = nodes.filter(n => {
  if (uniqueNodeIds.has(n.id)) return false;
  uniqueNodeIds.add(n.id);
  return true;
});

// Selectable destinations (non-junction nodes)
export const selectableNodes = deduplicatedNodes.filter(n =>
  n.type !== 'junction' || ['entrance', 'coffee-area', 'nbt-office', 'event-area'].includes(n.id)
);
