import { useState, useRef, useCallback } from 'react';

const ROWS = 15;
const COLS = 25;

function createGrid() {
    return Array.from({ length: ROWS }, () =>
        Array.from({ length: COLS }, () => 'empty')
    );
}

export default function Dijkstra() {
    const [grid, setGrid] = useState(() => createGrid());
    const [start, setStart] = useState({ r: 7, c: 2 });
    const [end, setEnd] = useState({ r: 7, c: 22 });
    const [running, setRunning] = useState(false);
    const [mode, setMode] = useState('wall');
    const stopRef = useRef(false);

    const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

    const reset = useCallback(() => {
        stopRef.current = true;
        setGrid(createGrid());
        setStart({ r: 7, c: 2 });
        setEnd({ r: 7, c: 22 });
        setRunning(false);
    }, []);

    const handleCellClick = (r, c) => {
        if (running) return;
        if (mode === 'start') { setStart({ r, c }); return; }
        if (mode === 'end') { setEnd({ r, c }); return; }
        setGrid((prev) => {
            const g = prev.map((row) => [...row]);
            g[r][c] = g[r][c] === 'wall' ? 'empty' : 'wall';
            return g;
        });
    };

    const run = useCallback(async () => {
        stopRef.current = false;
        setRunning(true);

        setGrid((prev) =>
            prev.map((row) =>
                row.map((cell) => (cell === 'visited' || cell === 'path' ? 'empty' : cell))
            )
        );

        await new Promise((r) => setTimeout(r, 50));

        const g = grid.map((row) =>
            row.map((cell) => (cell === 'visited' || cell === 'path' ? 'empty' : cell))
        );

        const dist = Array.from({ length: ROWS }, () => Array(COLS).fill(Infinity));
        const visited = Array.from({ length: ROWS }, () => Array(COLS).fill(false));
        const parent = Array.from({ length: ROWS }, () => Array(COLS).fill(null));
        const dirs = [[0, 1], [1, 0], [0, -1], [-1, 0]];

        dist[start.r][start.c] = 0;

        // Simple priority queue (not optimal, but visually clear)
        const pq = [{ r: start.r, c: start.c, d: 0 }];
        let found = false;

        while (pq.length > 0 && !stopRef.current) {
            // Extract min
            pq.sort((a, b) => a.d - b.d);
            const { r, c, d } = pq.shift();

            if (visited[r][c]) continue;
            visited[r][c] = true;

            if (!(r === start.r && c === start.c)) {
                g[r][c] = 'visited';
                setGrid(g.map((row) => [...row]));
                await sleep(15);
            }

            if (r === end.r && c === end.c) {
                found = true;
                break;
            }

            for (const [dr, dc] of dirs) {
                const nr = r + dr;
                const nc = c + dc;
                if (nr >= 0 && nr < ROWS && nc >= 0 && nc < COLS && !visited[nr][nc] && g[nr][nc] !== 'wall') {
                    const newDist = d + 1;
                    if (newDist < dist[nr][nc]) {
                        dist[nr][nc] = newDist;
                        parent[nr][nc] = { r, c };
                        pq.push({ r: nr, c: nc, d: newDist });
                    }
                }
            }
        }

        if (found && !stopRef.current) {
            let cur = { r: end.r, c: end.c };
            const pathCells = [];
            while (cur && !(cur.r === start.r && cur.c === start.c)) {
                pathCells.push(cur);
                cur = parent[cur.r][cur.c];
            }
            pathCells.reverse();
            for (const p of pathCells) {
                if (stopRef.current) break;
                g[p.r][p.c] = 'path';
                setGrid(g.map((row) => [...row]));
                await sleep(30);
            }
        }

        setRunning(false);
    }, [grid, start, end]);

    const getCellClass = (r, c, cell) => {
        if (r === start.r && c === start.c) return 'viz-cell viz-cell--start';
        if (r === end.r && c === end.c) return 'viz-cell viz-cell--end';
        return `viz-cell viz-cell--${cell}`;
    };

    return (
        <div>
            <div className="viz-controls">
                <button className="viz-btn viz-btn--primary" onClick={run} disabled={running}>
                    ▶ Run Dijkstra
                </button>
                <button className="viz-btn" onClick={reset}>↺ Reset</button>
                <button className={`viz-btn ${mode === 'wall' ? 'viz-btn--primary' : ''}`} onClick={() => setMode('wall')}>
                    🧱 Wall
                </button>
                <button className={`viz-btn ${mode === 'start' ? 'viz-btn--primary' : ''}`} onClick={() => setMode('start')}>
                    🟢 Start
                </button>
                <button className={`viz-btn ${mode === 'end' ? 'viz-btn--primary' : ''}`} onClick={() => setMode('end')}>
                    🔴 End
                </button>
            </div>

            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <div className="viz-grid" style={{ gridTemplateColumns: `repeat(${COLS}, 28px)` }}>
                    {grid.map((row, r) =>
                        row.map((cell, c) => (
                            <div
                                key={`${r}-${c}`}
                                className={getCellClass(r, c, cell)}
                                onClick={() => handleCellClick(r, c)}
                            />
                        ))
                    )}
                </div>
            </div>

            <div className="viz-info">
                Dijkstra&apos;s algorithm finds the shortest path in a weighted graph.
                Here all edges have weight 1, so it behaves similarly to BFS but uses a priority queue.
                Time: O(V² / E log V) | Space: O(V)
            </div>
        </div>
    );
}
