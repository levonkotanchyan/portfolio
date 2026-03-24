import { useParams, Link } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import BubbleSort from './algorithms/BubbleSort';
import QuickSort from './algorithms/QuickSort';
import BinarySearch from './algorithms/BinarySearch';
import BFS from './algorithms/BFS';
import DFS from './algorithms/DFS';
import Dijkstra from './algorithms/Dijkstra';
import './AlgorithmPage.css';

const COMPONENTS = {
    'bubble-sort': { title: 'Bubble Sort', component: BubbleSort },
    'quick-sort': { title: 'Quick Sort', component: QuickSort },
    'binary-search': { title: 'Binary Search', component: BinarySearch },
    bfs: { title: 'Breadth-First Search', component: BFS },
    dfs: { title: 'Depth-First Search', component: DFS },
    dijkstra: { title: "Dijkstra's Algorithm", component: Dijkstra },
};

export default function AlgorithmPage() {
    const { slug } = useParams();
    const entry = COMPONENTS[slug];

    if (!entry) {
        return (
            <div className="algo-page container">
                <Link to="/" className="algo-page__back"><FiArrowLeft /> Back</Link>
                <h1 className="algo-page__title">Algorithm not found</h1>
            </div>
        );
    }

    const Visualization = entry.component;

    return (
        <div className="algo-page">
            <div className="container">
                <Link to="/" className="algo-page__back">
                    <FiArrowLeft /> Back to home
                </Link>
                <h1 className="algo-page__title">{entry.title}</h1>
                <div className="algo-page__canvas">
                    <Visualization />
                </div>
            </div>
        </div>
    );
}
