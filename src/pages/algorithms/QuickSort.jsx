import { useState, useRef, useCallback } from 'react';

function generateArray(size = 30) {
    return Array.from({ length: size }, () => Math.floor(Math.random() * 90) + 10);
}

export default function QuickSort() {
    const [arr, setArr] = useState(() => generateArray());
    const [activeIndices, setActiveIndices] = useState([]);
    const [pivotIndex, setPivotIndex] = useState(-1);
    const [sortedIndices, setSortedIndices] = useState(new Set());
    const [running, setRunning] = useState(false);
    const stopRef = useRef(false);

    const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

    const reset = useCallback(() => {
        stopRef.current = true;
        setArr(generateArray());
        setActiveIndices([]);
        setPivotIndex(-1);
        setSortedIndices(new Set());
        setRunning(false);
    }, []);

    const partition = async (a, low, high) => {
        const pivot = a[high];
        setPivotIndex(high);
        let i = low - 1;

        for (let j = low; j < high; j++) {
            if (stopRef.current) return -1;
            setActiveIndices([j, i + 1]);
            await sleep(40);

            if (a[j] < pivot) {
                i++;
                [a[i], a[j]] = [a[j], a[i]];
                setArr([...a]);
            }
        }

        [a[i + 1], a[high]] = [a[high], a[i + 1]];
        setArr([...a]);
        setSortedIndices((prev) => new Set([...prev, i + 1]));
        return i + 1;
    };

    const quickSort = async (a, low, high) => {
        if (low < high && !stopRef.current) {
            const pi = await partition(a, low, high);
            if (pi === -1) return;
            await quickSort(a, low, pi - 1);
            await quickSort(a, pi + 1, high);
        }
        if (low >= high && low >= 0 && low < a.length) {
            setSortedIndices((prev) => new Set([...prev, low]));
        }
    };

    const sort = useCallback(async () => {
        stopRef.current = false;
        setRunning(true);
        const a = [...arr];
        await quickSort(a, 0, a.length - 1);
        if (!stopRef.current) {
            setSortedIndices(new Set(a.map((_, idx) => idx)));
            setActiveIndices([]);
            setPivotIndex(-1);
        }
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
                        className={`viz-bar ${activeIndices.includes(i) ? 'viz-bar--active' : ''} ${sortedIndices.has(i) ? 'viz-bar--sorted' : ''} ${i === pivotIndex ? 'viz-bar--pivot' : ''}`}
                        style={{
                            height: `${(val / maxVal) * 100}%`,
                            background:
                                sortedIndices.has(i) || activeIndices.includes(i) || i === pivotIndex
                                    ? undefined
                                    : `hsl(250, 50%, ${30 + (val / maxVal) * 30}%)`,
                        }}
                    />
                ))}
            </div>

            <div className="viz-info">
                Quick Sort picks a pivot element, partitions the array around it, and recursively sorts
                the sub-arrays. Time: O(n log n) avg | Space: O(log n)
            </div>
        </div>
    );
}
