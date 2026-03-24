import { useState, useRef, useCallback } from 'react';

function generateArray(size = 30) {
    return Array.from({ length: size }, () => Math.floor(Math.random() * 90) + 10);
}

export default function BubbleSort() {
    const [arr, setArr] = useState(() => generateArray());
    const [activeIndices, setActiveIndices] = useState([]);
    const [sortedIndices, setSortedIndices] = useState(new Set());
    const [running, setRunning] = useState(false);
    const stopRef = useRef(false);

    const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

    const reset = useCallback(() => {
        stopRef.current = true;
        setArr(generateArray());
        setActiveIndices([]);
        setSortedIndices(new Set());
        setRunning(false);
    }, []);

    const sort = useCallback(async () => {
        stopRef.current = false;
        setRunning(true);
        const a = [...arr];
        const n = a.length;

        for (let i = 0; i < n - 1; i++) {
            for (let j = 0; j < n - i - 1; j++) {
                if (stopRef.current) return;
                setActiveIndices([j, j + 1]);
                if (a[j] > a[j + 1]) {
                    [a[j], a[j + 1]] = [a[j + 1], a[j]];
                    setArr([...a]);
                }
                await sleep(30);
            }
            setSortedIndices((prev) => new Set([...prev, n - 1 - i]));
        }

        setSortedIndices(new Set(a.map((_, idx) => idx)));
        setActiveIndices([]);
        setRunning(false);
    }, [arr]);

    const maxVal = Math.max(...arr);

    return (
        <div>
            <div className="viz-controls">
                <button className="viz-btn viz-btn--primary" onClick={sort} disabled={running}>
                    ▶ Sort
                </button>
                <button className="viz-btn" onClick={reset}>
                    ↺ Reset
                </button>
            </div>

            <div className="viz-bars">
                {arr.map((val, i) => (
                    <div
                        key={i}
                        className={`viz-bar ${activeIndices.includes(i) ? 'viz-bar--active' : ''} ${sortedIndices.has(i) ? 'viz-bar--sorted' : ''}`}
                        style={{
                            height: `${(val / maxVal) * 100}%`,
                            background: sortedIndices.has(i)
                                ? undefined
                                : activeIndices.includes(i)
                                    ? undefined
                                    : `hsl(250, 50%, ${30 + (val / maxVal) * 30}%)`,
                        }}
                    />
                ))}
            </div>

            <div className="viz-info">
                Bubble Sort compares adjacent elements and swaps them if they are in the wrong order,
                repeatedly passing through the array until it is sorted. Time: O(n²) | Space: O(1)
            </div>
        </div>
    );
}
