import { useState, useRef, useCallback } from 'react';

function generateSortedArray(size = 20) {
    const arr = [];
    let val = Math.floor(Math.random() * 5) + 1;
    for (let i = 0; i < size; i++) {
        arr.push(val);
        val += Math.floor(Math.random() * 8) + 1;
    }
    return arr;
}

export default function BinarySearch() {
    const [arr, setArr] = useState(() => generateSortedArray());
    const [target, setTarget] = useState(() => 0);
    const [low, setLow] = useState(-1);
    const [high, setHigh] = useState(-1);
    const [mid, setMid] = useState(-1);
    const [found, setFound] = useState(-1);
    const [running, setRunning] = useState(false);
    const stopRef = useRef(false);

    const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

    const reset = useCallback(() => {
        stopRef.current = true;
        const newArr = generateSortedArray();
        setArr(newArr);
        setTarget(0);
        setLow(-1);
        setHigh(-1);
        setMid(-1);
        setFound(-1);
        setRunning(false);
    }, []);

    const search = useCallback(async () => {
        stopRef.current = false;
        setRunning(true);
        setFound(-1);

        // Pick a random target from the array (80% chance) or a missing value (20%)
        const useExisting = Math.random() < 0.8;
        const t = useExisting
            ? arr[Math.floor(Math.random() * arr.length)]
            : arr[arr.length - 1] + Math.floor(Math.random() * 10) + 1;
        setTarget(t);

        let lo = 0;
        let hi = arr.length - 1;

        while (lo <= hi && !stopRef.current) {
            setLow(lo);
            setHigh(hi);
            const m = Math.floor((lo + hi) / 2);
            setMid(m);
            await sleep(700);

            if (arr[m] === t) {
                setFound(m);
                setRunning(false);
                return;
            } else if (arr[m] < t) {
                lo = m + 1;
            } else {
                hi = m - 1;
            }
        }

        setMid(-1);
        setRunning(false);
    }, [arr]);

    const getClass = (i) => {
        if (found === i) return 'viz-number viz-number--found';
        if (mid === i) return 'viz-number viz-number--mid';
        if (i >= low && i <= high && low !== -1) return 'viz-number viz-number--active';
        if (low !== -1) return 'viz-number viz-number--eliminated';
        return 'viz-number';
    };

    return (
        <div>
            <div className="viz-controls">
                <button className="viz-btn viz-btn--primary" onClick={search} disabled={running}>
                    ▶ Search {running && target ? `for ${target}` : 'Random'}
                </button>
                <button className="viz-btn" onClick={reset}>
                    ↺ Reset
                </button>
                {target !== 0 && (
                    <span style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', alignSelf: 'center' }}>
                        Target: <strong style={{ color: 'var(--accent-secondary)' }}>{target}</strong>
                        {found !== -1 && <span style={{ color: 'var(--success)', marginLeft: 8 }}>Found at index {found}!</span>}
                        {!running && found === -1 && low !== -1 && (
                            <span style={{ color: 'var(--danger)', marginLeft: 8 }}>Not found</span>
                        )}
                    </span>
                )}
            </div>

            <div className="viz-number-line">
                {arr.map((val, i) => (
                    <div key={i} className={getClass(i)}>
                        {val}
                    </div>
                ))}
            </div>

            <div className="viz-info">
                Binary Search works on sorted arrays by repeatedly halving the search range.
                It compares the target to the middle element and eliminates half of the
                remaining elements each step. Time: O(log n) | Space: O(1)
            </div>
        </div>
    );
}
