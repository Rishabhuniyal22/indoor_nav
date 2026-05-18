import React, { useState, useCallback } from 'react';
import { FloorMap } from './components/FloorMap';
import { SidePanel } from './components/SidePanel';
import { PathResult } from './types';
import { deduplicatedNodes, edges } from './data/mapData';
import { findPath } from './algorithms/astar';

function App() {
  const [selectedStart, setSelectedStart] = useState<string | null>(null);
  const [selectedEnd, setSelectedEnd] = useState<string | null>(null);
  const [selectionMode, setSelectionMode] = useState<'start' | 'end'>('start');
  const [pathResult, setPathResult] = useState<PathResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleNodeClick = useCallback((nodeId: string) => {
    setError(null);
    if (selectionMode === 'start') {
      setSelectedStart(nodeId);
      setPathResult(null);
      // Auto-switch to end after selecting start
      if (!selectedEnd) setSelectionMode('end');
    } else {
      if (nodeId === selectedStart) {
        setError('Start and end cannot be the same location.');
        return;
      }
      setSelectedEnd(nodeId);
      setPathResult(null);
    }
  }, [selectionMode, selectedStart, selectedEnd]);

  const handleNodeSelect = useCallback((id: string, type: 'start' | 'end') => {
    if (type === 'start') setSelectedStart(id || null);
    else setSelectedEnd(id || null);
    setPathResult(null);
  }, []);

  const handleFindPath = useCallback(() => {
    if (!selectedStart || !selectedEnd) return;
    setError(null);

    const result = findPath(selectedStart, selectedEnd, deduplicatedNodes, edges);
    if (result) {
      // Filter path to only meaningful named nodes for display
      const namedNodes = result.nodes.filter(n => n.type !== 'junction' || n.id === selectedStart || n.id === selectedEnd);
      setPathResult({
        ...result,
        nodes: result.nodes, // keep all for path drawing
      });
    } else {
      setError('No path found between these locations. Please try different locations.');
    }
  }, [selectedStart, selectedEnd]);

  const handleClear = useCallback(() => {
    setSelectedStart(null);
    setSelectedEnd(null);
    setPathResult(null);
    setError(null);
    setSelectionMode('start');
  }, []);

  return (
    <div style={{ display: 'flex', height: '100vh', width: '100vw', overflow: 'hidden', fontFamily: "'Segoe UI', sans-serif" }}>
      <SidePanel
        selectedStart={selectedStart}
        selectedEnd={selectedEnd}
        pathResult={pathResult}
        selectionMode={selectionMode}
        onSetMode={setSelectionMode}
        onClear={handleClear}
        onFindPath={handleFindPath}
        onNodeSelect={handleNodeSelect}
      />
      <div style={{ flex: 1, position: 'relative', overflow: 'hidden' }}>
        <FloorMap
          selectedStart={selectedStart}
          selectedEnd={selectedEnd}
          pathResult={pathResult}
          onNodeClick={handleNodeClick}
          selectionMode={selectionMode}
        />

        {/* Instruction banner */}
        {!selectedStart && (
          <div style={{
            position: 'absolute', top: 20, left: '50%', transform: 'translateX(-50%)',
            background: 'rgba(30, 27, 46, 0.92)', color: 'white',
            padding: '10px 20px', borderRadius: 40, fontSize: 13, fontWeight: 500,
            backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,0.1)',
            pointerEvents: 'none', whiteSpace: 'nowrap',
          }}>
            👆 Click any stall or location on the map to set your <strong>Start</strong> point
          </div>
        )}
        {selectedStart && !selectedEnd && (
          <div style={{
            position: 'absolute', top: 20, left: '50%', transform: 'translateX(-50%)',
            background: 'rgba(30, 27, 46, 0.92)', color: 'white',
            padding: '10px 20px', borderRadius: 40, fontSize: 13, fontWeight: 500,
            backdropFilter: 'blur(8px)', border: '1px solid rgba(239,68,68,0.4)',
            pointerEvents: 'none', whiteSpace: 'nowrap',
          }}>
            👆 Now click your <strong style={{ color: '#ef4444' }}>Destination</strong>
          </div>
        )}
        {selectedStart && selectedEnd && !pathResult && (
          <div style={{
            position: 'absolute', top: 20, left: '50%', transform: 'translateX(-50%)',
            background: 'rgba(30, 27, 46, 0.92)', color: 'white',
            padding: '10px 20px', borderRadius: 40, fontSize: 13, fontWeight: 500,
            backdropFilter: 'blur(8px)', border: '1px solid rgba(245,158,11,0.4)',
            pointerEvents: 'none', whiteSpace: 'nowrap',
          }}>
            ✅ Click <strong style={{ color: '#f59e0b' }}>Find Shortest Path</strong> in the panel →
          </div>
        )}

        {/* Error message */}
        {error && (
          <div style={{
            position: 'absolute', bottom: 20, left: '50%', transform: 'translateX(-50%)',
            background: 'rgba(239, 68, 68, 0.95)', color: 'white',
            padding: '10px 20px', borderRadius: 10, fontSize: 13,
            backdropFilter: 'blur(8px)', maxWidth: 400, textAlign: 'center',
          }}>
            ⚠️ {error}
          </div>
        )}

        {/* Path success banner */}
        {pathResult && (
          <div style={{
            position: 'absolute', bottom: 20, left: '50%', transform: 'translateX(-50%)',
            background: 'rgba(245, 158, 11, 0.95)', color: 'white',
            padding: '10px 24px', borderRadius: 40, fontSize: 13, fontWeight: 600,
            backdropFilter: 'blur(8px)', whiteSpace: 'nowrap',
          }}>
            ✅ Optimal path found — {Math.round(pathResult.totalDistance)} units, {pathResult.path.length} waypoints
          </div>
        )}

        {/* Zoom controls */}
        <div style={{
          position: 'absolute', right: 20, bottom: 70,
          display: 'flex', flexDirection: 'column', gap: 4,
        }}>
          <div style={{ fontSize: 10, color: '#94a3b8', textAlign: 'center', marginBottom: 2 }}>
            Scroll to zoom
          </div>
          <div style={{ fontSize: 10, color: '#94a3b8', textAlign: 'center' }}>
            Drag to pan
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
