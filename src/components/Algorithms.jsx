import { Link } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import './Algorithms.css';

const algorithms = [
    {
        slug: 'bubble-sort',
        title: 'Bubble Sort',
        description: 'Compare adjacent elements and swap them in the right order.',
        icon: '🫧',
        complexity: 'O(n²)',
        category: 'Sorting',
    },
    {
        slug: 'quick-sort',
        title: 'Quick Sort',
        description: 'Divide-and-conquer with pivot partitioning.',
        icon: '⚡',
        complexity: 'O(n log n)',
        category: 'Sorting',
    },
    {
        slug: 'binary-search',
        title: 'Binary Search',
        description: 'Search a sorted array by repeatedly dividing the range.',
        icon: '🔍',
        complexity: 'O(log n)',
        category: 'Search',
    },
    {
        slug: 'bfs',
        title: 'BFS',
        description: 'Explore a graph level by level using a queue.',
        icon: '🌊',
        complexity: 'O(V + E)',
        category: 'Graph',
    },
    {
        slug: 'dfs',
        title: 'DFS',
        description: 'Explore a graph as deep as possible along each branch.',
        icon: '🕳️',
        complexity: 'O(V + E)',
        category: 'Graph',
    },
    {
        slug: 'dijkstra',
        title: 'Dijkstra',
        description: 'Find the shortest path in a weighted graph.',
        icon: '🗺️',
        complexity: 'O(V² / E log V)',
        category: 'Graph',
    },
];

export default function Algorithms() {
    const sectionRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('algorithms--visible');
                }
            },
            { threshold: 0.05 }
        );
        if (sectionRef.current) observer.observe(sectionRef.current);
        return () => observer.disconnect();
    }, []);

    return (
        <section className="algorithms" id="algorithms" ref={sectionRef}>
            <div className="container">
                <h2 className="section-title">Algorithms</h2>
                <p className="section-subtitle">
                    Interactive visualizations to explore fundamental algorithms step by step.
                </p>

                <div className="algorithms__grid">
                    {algorithms.map((algo, i) => (
                        <Link
                            to={`/algorithm/${algo.slug}`}
                            key={algo.slug}
                            className={`algo-card animate-delay-${i + 1}`}
                            id={`algo-card-${algo.slug}`}
                        >
                            <div className="algo-card__header">
                                <span className="algo-card__icon">{algo.icon}</span>
                                <span className="algo-card__category">{algo.category}</span>
                            </div>
                            <h3 className="algo-card__title">{algo.title}</h3>
                            <p className="algo-card__desc">{algo.description}</p>
                            <div className="algo-card__footer">
                                <span className="algo-card__complexity">{algo.complexity}</span>
                                <span className="algo-card__arrow">→</span>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
