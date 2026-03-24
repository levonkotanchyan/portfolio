import { useEffect, useRef, useState } from 'react';
import './LeetCode.css';

const LEETCODE_USERNAME = 'l3v0n'; // Replace with your username

const DIFFICULTY_COLORS = {
    Easy: 'var(--success)',
    Medium: 'var(--warning)',
    Hard: 'var(--danger)',
};

// Fallback demo data shown when the API is unavailable (CORS, etc.)
const FALLBACK_DATA = [
    { title: 'Two Sum', difficulty: 'Easy', status: 'Accepted' },
    { title: 'Add Two Numbers', difficulty: 'Medium', status: 'Accepted' },
    { title: 'Longest Substring Without Repeating Characters', difficulty: 'Medium', status: 'Accepted' },
    { title: 'Median of Two Sorted Arrays', difficulty: 'Hard', status: 'Accepted' },
    { title: 'Longest Palindromic Substring', difficulty: 'Medium', status: 'Accepted' },
    { title: 'Reverse Integer', difficulty: 'Medium', status: 'Accepted' },
    { title: 'String to Integer (atoi)', difficulty: 'Medium', status: 'Accepted' },
    { title: 'Palindrome Number', difficulty: 'Easy', status: 'Accepted' },
    { title: 'Container With Most Water', difficulty: 'Medium', status: 'Accepted' },
    { title: 'Roman to Integer', difficulty: 'Easy', status: 'Accepted' },
];

export default function LeetCode() {
    const [problems, setProblems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const sectionRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('leetcode--visible');
                }
            },
            { threshold: 0.05 }
        );
        if (sectionRef.current) observer.observe(sectionRef.current);
        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        const fetchProblems = async () => {
            try {
                const query = `{
          recentAcSubmissionList(username: "${LEETCODE_USERNAME}", limit: 10) {
            title
            titleSlug
            timestamp
          }
        }`;

                const res = await fetch('https://leetcode.com/graphql', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ query }),
                });

                if (!res.ok) throw new Error('Network error');
                const data = await res.json();
                const submissions = data?.data?.recentAcSubmissionList;

                if (submissions?.length) {
                    setProblems(
                        submissions.map((s) => ({
                            title: s.title,
                            titleSlug: s.titleSlug,
                            difficulty: '—',
                            status: 'Accepted',
                        }))
                    );
                } else {
                    throw new Error('No data');
                }
            } catch {
                // Use fallback demo data
                setProblems(FALLBACK_DATA);
                setError(true);
            } finally {
                setLoading(false);
            }
        };

        fetchProblems();
    }, []);

    return (
        <section className="leetcode" id="leetcode" ref={sectionRef}>
            <div className="container">
                <h2 className="section-title">LeetCode</h2>
                <p className="section-subtitle">
                    Recent problem-solving activity — grinding one problem at a time.
                </p>

                {loading ? (
                    <div className="leetcode__skeleton-list">
                        {Array.from({ length: 5 }).map((_, i) => (
                            <div className="leetcode__skeleton" key={i} />
                        ))}
                    </div>
                ) : (
                    <>
                        <div className="leetcode__list">
                            {problems.map((p, i) => (
                                <div
                                    className={`leetcode__row animate-delay-${Math.min(i + 1, 6)}`}
                                    key={i}
                                >
                                    <div className="leetcode__row-left">
                                        <span className="leetcode__index">
                                            {String(i + 1).padStart(2, '0')}
                                        </span>
                                        <span className="leetcode__title">{p.title}</span>
                                    </div>
                                    <div className="leetcode__row-right">
                                        <span
                                            className="leetcode__difficulty"
                                            style={{ '--diff-color': DIFFICULTY_COLORS[p.difficulty] || 'var(--text-muted)' }}
                                        >
                                            {p.difficulty}
                                        </span>
                                        <span className="leetcode__status leetcode__status--accepted">
                                            ✓
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </>
                )}
            </div>
        </section>
    );
}
