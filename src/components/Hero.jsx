import { useEffect, useRef } from 'react';
import { FiArrowRight } from 'react-icons/fi';
import './Hero.css';

export default function Hero() {
    const heroRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('hero--visible');
                }
            },
            { threshold: 0.1 }
        );
        if (heroRef.current) observer.observe(heroRef.current);
        return () => observer.disconnect();
    }, []);

    return (
        <section className="hero" ref={heroRef} id="hero">
            {/* Animated background blobs */}
            <div className="hero__blobs">
                <div className="hero__blob hero__blob--1" />
                <div className="hero__blob hero__blob--2" />
                <div className="hero__blob hero__blob--3" />
            </div>

            {/* Grid overlay */}
            <div className="hero__grid" />

            <div className="hero__content container">
                <div className="hero__badge">
                    <span className="hero__badge-dot" />
                    Available for projects
                </div>

                <h1 className="hero__title">
                    Hi, I'm <span className="hero__name">Levon</span>
                </h1>

                <p className="hero__subtitle">
                    Student &amp; Developer crafting clean code, solving algorithmic puzzles,
                    and building digital experiences that matter.
                </p>

                <div className="hero__actions">
                    <a
                        href="https://t.me/YourBotUsername"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hero__cta"
                        id="cta-telegram"
                    >
                        Open Telegram Bot
                        <FiArrowRight className="hero__cta-icon" />
                    </a>
                    <a href="#algorithms" className="hero__cta hero__cta--ghost">
                        View Algorithms
                    </a>
                </div>

                <div className="hero__stats">
                    <div className="hero__stat">
                        <span className="hero__stat-number">6</span>
                        <span className="hero__stat-label">Algorithms</span>
                    </div>
                    <div className="hero__stat">
                        <span className="hero__stat-number">50+</span>
                        <span className="hero__stat-label">LeetCode</span>
                    </div>
                    <div className="hero__stat">
                        <span className="hero__stat-number">∞</span>
                        <span className="hero__stat-label">Curiosity</span>
                    </div>
                </div>
            </div>

            {/* Scroll indicator */}
            <div className="hero__scroll">
                <div className="hero__scroll-line" />
            </div>
        </section>
    );
}
