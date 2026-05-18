# 🗺️ Indoor Navigation System

An interactive indoor navigation system using A* pathfinding, built with React + TypeScript.

## Features

- **Interactive SVG Floor Map** — zoom, pan, and click to navigate
- **A\* Pathfinding Algorithm** — finds the optimal shortest path
- **38 Book Stalls** (S1–S38) + Coffee Area, Event Area, NBT Office, Entrance
- **Animated Path Rendering** — glowing animated path with direction indicators
- **Step-by-step Route Display** — see every waypoint on your route
- **Select Start & End** — click any location on the map

## Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

```bash
npm install
npm run dev
```

Open http://localhost:5173 in your browser.

### Build for Production

```bash
npm run build
npm run preview
```

## How to Use

1. **Set Start**: Click "Set Start" in the sidebar, then click any stall or location on the map
2. **Set End**: Click "Set End", then click your destination
3. **Find Path**: Click "Find Shortest Path" — the optimal route lights up instantly
4. **Navigate**: Follow the glowing amber path with animated direction indicators

## Map Layout

| Area | Contents |
|------|----------|
| Book Stalls Area | S1–S10 (Row 1), S11–S20 (Row 2), S21–S30 (Row 3), S31–S34 (Row 4), S35–S38 (Side column) |
| Coffee Area | Coffee Machine |
| Event Area | Main event space |
| NBT Office | Administrative office |
| Entrance | Main entry point |

## Tech Stack

- **React 18** + **TypeScript**
- **Vite** (build tool)
- **A\* Algorithm** (custom implementation, no external library)
- **SVG** (interactive map rendering)
- Pure CSS animations (no external animation library)

## Algorithm

The A* implementation uses:
- **g(n)**: Euclidean distance from start
- **h(n)**: Euclidean distance heuristic to destination  
- **f(n) = g(n) + h(n)**: Total estimated cost

The graph models all walkable paths as edges connecting stalls, junctions, corridors, and area access points.
