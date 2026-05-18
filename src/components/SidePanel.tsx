import React from 'react';
import { MapNode, PathResult } from '../types';
import { deduplicatedNodes } from '../data/mapData';

interface SidePanelProps {
  selectedStart: string | null;
  selectedEnd: string | null;
  pathResult: PathResult | null;
  selectionMode: 'start' | 'end';
  onSetMode: (mode: 'start' | 'end') => void;
  onClear: () => void;
  onFindPath: () => void;
  onNodeSelect: (id: string, type: 'start' | 'end') => void;
}

const selectableNodes = deduplicatedNodes.filter(n =>
  n.type === 'stall' || n.type === 'entrance' || n.type === 'facility' || n.type === 'area'
);

const groupedNodes: Record<string, MapNode[]> = {};
selectableNodes.forEach(n => {
  const area = n.area || 'Other';
  if (!groupedNodes[area]) groupedNodes[area] = [];
  groupedNodes[area].push(n);
});

export const SidePanel: React.FC<SidePanelProps> = ({
  selectedStart, selectedEnd, pathResult, selectionMode,
  onSetMode, onClear, onFindPath, onNodeSelect
}) => {
  const startNode = deduplicatedNodes.find(n => n.id === selectedStart);
  const endNode = deduplicatedNodes.find(n => n.id === selectedEnd);

  return (
    <div style={{
      width: 300,
      minWidth: 260,
      background: 'linear-gradient(180deg, #1e1b2e 0%, #16213e 100%)',
      color: 'white',
      display: 'flex',
      flexDirection: 'column',
      fontFamily: "'Segoe UI', sans-serif",
      boxShadow: '4px 0 20px rgba(0,0,0,0.3)',
      zIndex: 10,
      overflowY: 'auto',
    }}>
      {/* Header */}
      <div style={{ padding: '24px 20px 16px', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
          <span style={{ fontSize: 24 }}>🗺️</span>
          <div>
            <div style={{ fontSize: 18, fontWeight: 700, letterSpacing: '-0.3px' }}>Indoor Navigator</div>
            <div style={{ fontSize: 11, color: '#94a3b8', marginTop: 2 }}>A* Pathfinding System</div>
          </div>
        </div>
      </div>

      {/* Selection Mode */}
      <div style={{ padding: '16px 20px', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
        <div style={{ fontSize: 11, color: '#94a3b8', marginBottom: 10, letterSpacing: '0.5px', textTransform: 'uppercase' }}>
          Selection Mode
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          {(['start', 'end'] as const).map(mode => (
            <button
              key={mode}
              onClick={() => onSetMode(mode)}
              style={{
                flex: 1, padding: '8px 12px', borderRadius: 8, border: 'none',
                cursor: 'pointer', fontWeight: 600, fontSize: 12, transition: 'all 0.2s',
                background: selectionMode === mode
                  ? (mode === 'start' ? '#22c55e' : '#ef4444')
                  : 'rgba(255,255,255,0.08)',
                color: selectionMode === mode ? 'white' : '#94a3b8',
              }}
            >
              {mode === 'start' ? '🟢 Set Start' : '🔴 Set End'}
            </button>
          ))}
        </div>
      </div>

      {/* Selected Locations */}
      <div style={{ padding: '16px 20px', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
        <div style={{ fontSize: 11, color: '#94a3b8', marginBottom: 10, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
          Selected Locations
        </div>
        <LocationCard label="Start" node={startNode} color="#22c55e" onClear={() => onNodeSelect('', 'start')} />
        <LocationCard label="End" node={endNode} color="#ef4444" onClear={() => onNodeSelect('', 'end')} />
      </div>

      {/* Find Path Button */}
      <div style={{ padding: '12px 20px' }}>
        <button
          onClick={onFindPath}
          disabled={!selectedStart || !selectedEnd}
          style={{
            width: '100%', padding: '12px', borderRadius: 10, border: 'none',
            cursor: selectedStart && selectedEnd ? 'pointer' : 'not-allowed',
            fontWeight: 700, fontSize: 14, transition: 'all 0.2s',
            background: selectedStart && selectedEnd
              ? 'linear-gradient(135deg, #f59e0b, #d97706)'
              : 'rgba(255,255,255,0.08)',
            color: selectedStart && selectedEnd ? 'white' : '#475569',
            boxShadow: selectedStart && selectedEnd ? '0 4px 14px rgba(245,158,11,0.4)' : 'none',
          }}
        >
          🔍 Find Shortest Path
        </button>
        <button
          onClick={onClear}
          style={{
            width: '100%', padding: '8px', borderRadius: 8, border: '1px solid rgba(255,255,255,0.1)',
            cursor: 'pointer', fontWeight: 500, fontSize: 12, marginTop: 8, transition: 'all 0.2s',
            background: 'transparent', color: '#94a3b8',
          }}
        >
          ✕ Clear All
        </button>
      </div>

      {/* Path Result */}
      {pathResult && (
        <div style={{ padding: '16px 20px', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
          <div style={{ fontSize: 11, color: '#94a3b8', marginBottom: 10, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
            Route Details
          </div>
          <div style={{
            background: 'rgba(245,158,11,0.1)', border: '1px solid rgba(245,158,11,0.3)',
            borderRadius: 10, padding: '12px 14px', marginBottom: 12
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
              <span style={{ color: '#94a3b8', fontSize: 12 }}>Distance</span>
              <span style={{ color: '#f59e0b', fontWeight: 700, fontSize: 14 }}>
                {Math.round(pathResult.totalDistance)} units
              </span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: '#94a3b8', fontSize: 12 }}>Steps</span>
              <span style={{ color: '#f59e0b', fontWeight: 700, fontSize: 14 }}>
                {pathResult.path.length} nodes
              </span>
            </div>
          </div>

          {/* Step-by-step path */}
          <div style={{ fontSize: 11, color: '#94a3b8', marginBottom: 8 }}>Path Nodes:</div>
          <div style={{ maxHeight: 200, overflowY: 'auto' }}>
            {pathResult.nodes.map((n, i) => (
              <div key={n.id} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '4px 0' }}>
                <div style={{
                  width: 20, height: 20, borderRadius: '50%', flexShrink: 0,
                  background: i === 0 ? '#22c55e' : i === pathResult.nodes.length - 1 ? '#ef4444' : '#f59e0b',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 9, fontWeight: 700, color: 'white'
                }}>
                  {i + 1}
                </div>
                <span style={{ fontSize: 12, color: i === 0 || i === pathResult.nodes.length - 1 ? 'white' : '#cbd5e1' }}>
                  {n.label || n.id}
                </span>
                {i < pathResult.nodes.length - 1 && (
                  <span style={{ color: '#475569', fontSize: 10 }}>↓</span>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Legend */}
      <div style={{ padding: '16px 20px', marginTop: 'auto', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
        <div style={{ fontSize: 11, color: '#94a3b8', marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
          Legend
        </div>
        {[
          { color: '#22c55e', label: 'Start Point' },
          { color: '#ef4444', label: 'End Point' },
          { color: '#f59e0b', label: 'Path Node' },
          { color: '#94a3b8', label: 'Stall' },
          { color: '#8b5cf6', label: 'Facility' },
        ].map(item => (
          <div key={item.label} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 5 }}>
            <div style={{ width: 12, height: 12, borderRadius: 3, background: item.color, flexShrink: 0 }} />
            <span style={{ fontSize: 11, color: '#94a3b8' }}>{item.label}</span>
          </div>
        ))}
        <div style={{ marginTop: 12, fontSize: 10, color: '#475569', lineHeight: 1.5 }}>
          🖱️ Scroll to zoom • Drag to pan<br />
          Click any stall or location to select
        </div>
      </div>
    </div>
  );
};

interface LocationCardProps {
  label: string;
  node?: MapNode;
  color: string;
  onClear: () => void;
}

const LocationCard: React.FC<LocationCardProps> = ({ label, node, color, onClear }) => (
  <div style={{
    background: node ? `${color}18` : 'rgba(255,255,255,0.04)',
    border: `1px solid ${node ? color + '44' : 'rgba(255,255,255,0.08)'}`,
    borderRadius: 8, padding: '8px 12px', marginBottom: 8,
    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
  }}>
    <div>
      <div style={{ fontSize: 10, color: '#64748b', marginBottom: 2 }}>{label}</div>
      <div style={{ fontSize: 13, fontWeight: 600, color: node ? color : '#475569' }}>
        {node ? node.label : 'Not selected'}
      </div>
      {node?.area && (
        <div style={{ fontSize: 10, color: '#64748b', marginTop: 1 }}>{node.area}</div>
      )}
    </div>
    {node && (
      <button onClick={onClear} style={{
        background: 'none', border: 'none', cursor: 'pointer',
        color: '#475569', fontSize: 16, padding: '2px 6px',
      }}>×</button>
    )}
  </div>
);
