import React, { useRef, useState, useCallback, useEffect } from 'react';
import { MapNode, PathResult } from '../types';
import { deduplicatedNodes } from '../data/mapData';

interface FloorMapProps {
  selectedStart: string | null;
  selectedEnd: string | null;
  pathResult: PathResult | null;
  onNodeClick: (nodeId: string) => void;
  selectionMode: 'start' | 'end';
}

const SVG_W = 1400;
const SVG_H = 800;

// Area definitions matching the floor plan
const areas = [
  {
    id: 'coffee',
    label: 'Coffee Area',
    x: 15, y: 30, w: 450, h: 330,
    fill: '#fdf3e3',
    stroke: '#c9a96e',
    labelColor: '#8B6914',
  },
  {
    id: 'bookstalls',
    label: 'Book Stalls Area',
    x: 460, y: 60, w: 900, h: 360,
    fill: '#e8f4fd',
    stroke: '#5b9bd5',
    labelColor: '#2c5f8a',
  },
  {
    id: 'event',
    label: 'Event Area',
    x: 580, y: 430, w: 700, h: 190,
    fill: '#eef5ee',
    stroke: '#7aad7a',
    labelColor: '#3d7a3d',
  },
  {
    id: 'nbt',
    label: 'NBT Office',
    x: 860, y: 630, w: 340, h: 130,
    fill: '#f3eef8',
    stroke: '#9b72cf',
    labelColor: '#6b3fa0',
  },
  {
    id: 'entrance',
    label: 'Entrance →',
    x: 15, y: 660, w: 490, h: 100,
    fill: '#e8e8e8',
    stroke: '#aaaaaa',
    labelColor: '#555555',
  },
];

// Coffee machine sub-area
const coffeeBox = { x: 40, y: 100, w: 220, h: 210 };

function getNodeColor(node: MapNode, isStart: boolean, isEnd: boolean, isOnPath: boolean): string {
  if (isStart) return '#22c55e';
  if (isEnd) return '#ef4444';
  if (isOnPath) return '#f59e0b';
  switch (node.type) {
    case 'stall': return '#94a3b8';
    case 'entrance': return '#6366f1';
    case 'area': return '#10b981';
    case 'facility': return '#8b5cf6';
    default: return '#cbd5e1';
  }
}

function getNodeRadius(node: MapNode): number {
  switch (node.type) {
    case 'stall': return 22;
    case 'entrance': return 18;
    case 'area': return 16;
    case 'facility': return 14;
    default: return 6;
  }
}

export const FloorMap: React.FC<FloorMapProps> = ({
  selectedStart,
  selectedEnd,
  pathResult,
  onNodeClick,
  selectionMode,
}) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const [viewBox, setViewBox] = useState({ x: 0, y: 0, w: SVG_W, h: SVG_H });
  const [isPanning, setIsPanning] = useState(false);
  const [panStart, setPanStart] = useState({ x: 0, y: 0, vx: 0, vy: 0 });
  const [zoom, setZoom] = useState(1);

  const pathSet = new Set(pathResult?.path || []);

  // Build SVG path string from path nodes
  const pathD = (() => {
    if (!pathResult || pathResult.nodes.length < 2) return '';
    const pts = pathResult.nodes.map(n => `${n.x},${n.y}`);
    return `M ${pts.join(' L ')}`;
  })();

  const handleWheel = useCallback((e: React.WheelEvent) => {
    e.preventDefault();
    const factor = e.deltaY < 0 ? 0.85 : 1.18;
    const newZoom = Math.min(5, Math.max(0.3, zoom * (1 / factor)));
    const newW = SVG_W / newZoom;
    const newH = SVG_H / newZoom;
    const rect = svgRef.current?.getBoundingClientRect();
    if (!rect) return;
    const mx = ((e.clientX - rect.left) / rect.width) * viewBox.w + viewBox.x;
    const my = ((e.clientY - rect.top) / rect.height) * viewBox.h + viewBox.y;
    setViewBox({
      x: mx - (mx - viewBox.x) * (newW / viewBox.w),
      y: my - (my - viewBox.y) * (newH / viewBox.h),
      w: newW,
      h: newH,
    });
    setZoom(newZoom);
  }, [zoom, viewBox]);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if (e.button !== 0) return;
    setIsPanning(true);
    setPanStart({ x: e.clientX, y: e.clientY, vx: viewBox.x, vy: viewBox.y });
  }, [viewBox]);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isPanning) return;
    const rect = svgRef.current?.getBoundingClientRect();
    if (!rect) return;
    const dx = ((e.clientX - panStart.x) / rect.width) * viewBox.w;
    const dy = ((e.clientY - panStart.y) / rect.height) * viewBox.h;
    setViewBox(v => ({ ...v, x: panStart.vx - dx, y: panStart.vy - dy }));
  }, [isPanning, panStart, viewBox.w, viewBox.h]);

  const handleMouseUp = useCallback(() => setIsPanning(false), []);

  const handleNodeClick = useCallback((e: React.MouseEvent, nodeId: string) => {
    e.stopPropagation();
    onNodeClick(nodeId);
  }, [onNodeClick]);

  const displayNodes = deduplicatedNodes.filter(n => n.type !== 'junction');

  // Path animation dash
  const [dashOffset, setDashOffset] = useState(0);
  useEffect(() => {
    if (!pathResult) return;
    let raf: number;
    let offset = 0;
    const animate = () => {
      offset = (offset - 2 + 1000) % 1000;
      setDashOffset(offset);
      raf = requestAnimationFrame(animate);
    };
    raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, [pathResult]);

  return (
    <svg
      ref={svgRef}
      viewBox={`${viewBox.x} ${viewBox.y} ${viewBox.w} ${viewBox.h}`}
      style={{ width: '100%', height: '100%', cursor: isPanning ? 'grabbing' : 'grab', background: '#f5f0e8' }}
      onWheel={handleWheel}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      <defs>
        <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="2" dy="2" stdDeviation="3" floodOpacity="0.15" />
        </filter>
        <filter id="glow">
          <feGaussianBlur stdDeviation="4" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
        <marker id="arrowhead" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
          <polygon points="0 0, 8 3, 0 6" fill="#f59e0b" />
        </marker>
        <marker id="arrowhead-start" markerWidth="8" markerHeight="6" refX="0" refY="3" orient="auto">
          <polygon points="8 0, 0 3, 8 6" fill="#22c55e" />
        </marker>
      </defs>

      {/* ── AREAS ── */}
      {areas.map(area => (
        <g key={area.id}>
          <rect
            x={area.x} y={area.y} width={area.w} height={area.h}
            rx={12} ry={12}
            fill={area.fill}
            stroke={area.stroke}
            strokeWidth={2}
            filter="url(#shadow)"
          />
          <text
            x={area.x + area.w / 2}
            y={area.id === 'entrance' ? area.y + 38 : area.y + 32}
            textAnchor="middle"
            fontSize={area.id === 'nbt' ? 16 : 18}
            fontWeight="600"
            fill={area.labelColor}
            fontFamily="'Segoe UI', sans-serif"
          >
            {area.label}
          </text>
        </g>
      ))}

      {/* ── COFFEE MACHINE BOX ── */}
      <rect
        x={coffeeBox.x} y={coffeeBox.y}
        width={coffeeBox.w} height={coffeeBox.h}
        rx={8} ry={8}
        fill="#f5e6c8" stroke="#c9a96e" strokeWidth={1.5}
      />

      {/* ── ENTRANCE ARROWS ── */}
      {[80, 250, 420].map((x, i) => (
        <g key={i}>
          <polygon
            points={`${x},700 ${x + 40},685 ${x + 40},715`}
            fill="#bbb" opacity={0.7}
          />
        </g>
      ))}
      {/* Upward arrows in corridor */}
      {[250, 430, 620].map((x, i) => (
        <g key={`up-${i}`}>
          <polygon
            points={`${x - 20},600 ${x},550 ${x + 20},600`}
            fill="#ccc" opacity={0.6}
          />
          <polygon
            points={`${x - 20},540 ${x},490 ${x + 20},540`}
            fill="#ccc" opacity={0.6}
          />
        </g>
      ))}
      <polygon points="690,490 720,440 750,490" fill="#ccc" opacity={0.6} />

      {/* ── WALKABLE PATH (background grid for aisles) ── */}
      {/* Horizontal aisle indicators */}
      {[380, 320, 260, 180].map(y => (
        <line key={y} x1={480} y1={y} x2={1300} y2={y}
          stroke="#d0d8e4" strokeWidth={1} strokeDasharray="4,4" opacity={0.5} />
      ))}

      {/* ── PATH RENDERING ── */}
      {pathResult && pathResult.nodes.length >= 2 && (
        <>
          {/* Glow / shadow under path */}
          <path
            d={pathD}
            fill="none"
            stroke="#f59e0b"
            strokeWidth={18}
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity={0.2}
            filter="url(#glow)"
          />
          {/* Main path line */}
          <path
            d={pathD}
            fill="none"
            stroke="#f59e0b"
            strokeWidth={7}
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity={0.95}
          />
          {/* Animated dashed overlay */}
          <path
            d={pathD}
            fill="none"
            stroke="white"
            strokeWidth={3}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeDasharray="12,16"
            strokeDashoffset={dashOffset}
            opacity={0.8}
          />
          {/* Direction arrow at end */}
          {pathResult.nodes.length >= 2 && (() => {
            const last = pathResult.nodes[pathResult.nodes.length - 1];
            const prev = pathResult.nodes[pathResult.nodes.length - 2];
            const angle = Math.atan2(last.y - prev.y, last.x - prev.x) * 180 / Math.PI;
            return (
              <g transform={`translate(${last.x},${last.y}) rotate(${angle})`}>
                <polygon points="-6,-5 10,0 -6,5" fill="#ef4444" opacity={0.9} />
              </g>
            );
          })()}
        </>
      )}

      {/* ── STALL NODES ── */}
      {displayNodes.map(node => {
        const isStart = node.id === selectedStart;
        const isEnd = node.id === selectedEnd;
        const isOnPath = pathSet.has(node.id);
        const r = getNodeRadius(node);
        const color = getNodeColor(node, isStart, isEnd, isOnPath);
        const isClickable = node.type === 'stall' || node.type === 'entrance' || node.type === 'facility' || node.type === 'area';

        if (node.type === 'junction') return null;

        return (
          <g
            key={node.id}
            onClick={isClickable ? (e) => handleNodeClick(e, node.id) : undefined}
            style={{ cursor: isClickable ? 'pointer' : 'default' }}
          >
            {/* Highlight ring for selected/path nodes */}
            {(isStart || isEnd) && (
              <circle cx={node.x} cy={node.y} r={r + 8} fill="none"
                stroke={isStart ? '#22c55e' : '#ef4444'}
                strokeWidth={3} opacity={0.6}
              >
                <animate attributeName="r" values={`${r + 5};${r + 12};${r + 5}`} dur="1.5s" repeatCount="indefinite" />
                <animate attributeName="opacity" values="0.6;0.2;0.6" dur="1.5s" repeatCount="indefinite" />
              </circle>
            )}
            {isOnPath && !isStart && !isEnd && (
              <circle cx={node.x} cy={node.y} r={r + 4} fill="#f59e0b" opacity={0.3} />
            )}

            {/* Main node shape */}
            {node.type === 'stall' ? (
              <rect
                x={node.x - r} y={node.y - r}
                width={r * 2} height={r * 2}
                rx={5} ry={5}
                fill={isStart || isEnd || isOnPath ? color : 'white'}
                stroke={isStart ? '#22c55e' : isEnd ? '#ef4444' : isOnPath ? '#f59e0b' : '#94a3b8'}
                strokeWidth={isStart || isEnd ? 3 : isOnPath ? 2.5 : 1.5}
                filter={isStart || isEnd ? 'url(#shadow)' : undefined}
              />
            ) : (
              <circle
                cx={node.x} cy={node.y} r={r}
                fill={color}
                stroke="white"
                strokeWidth={2}
                filter="url(#shadow)"
              />
            )}

            {/* Label */}
            <text
              x={node.x} y={node.y}
              textAnchor="middle"
              dominantBaseline="middle"
              fontSize={node.type === 'stall' ? 9 : node.type === 'facility' ? 8 : 10}
              fontWeight="600"
              fill={node.type === 'stall' && !isStart && !isEnd && !isOnPath ? '#475569' : 'white'}
              fontFamily="'Segoe UI', sans-serif"
              pointerEvents="none"
            >
              {node.label}
            </text>

            {/* Hover tooltip area name for stalls */}
            {node.type === 'stall' && isOnPath && (
              <text
                x={node.x} y={node.y - r - 5}
                textAnchor="middle"
                fontSize={8}
                fill="#f59e0b"
                fontWeight="700"
                fontFamily="'Segoe UI', sans-serif"
                pointerEvents="none"
              >
                ✓
              </text>
            )}
          </g>
        );
      })}

      {/* ── START / END LABELS ── */}
      {selectedStart && (() => {
        const n = deduplicatedNodes.find(nd => nd.id === selectedStart);
        if (!n) return null;
        return (
          <text x={n.x} y={n.y - 32} textAnchor="middle"
            fontSize={11} fontWeight="700" fill="#22c55e"
            fontFamily="'Segoe UI', sans-serif" filter="url(#shadow)">
            START
          </text>
        );
      })()}
      {selectedEnd && (() => {
        const n = deduplicatedNodes.find(nd => nd.id === selectedEnd);
        if (!n) return null;
        return (
          <text x={n.x} y={n.y - 32} textAnchor="middle"
            fontSize={11} fontWeight="700" fill="#ef4444"
            fontFamily="'Segoe UI', sans-serif" filter="url(#shadow)">
            END
          </text>
        );
      })()}
    </svg>
  );
};
