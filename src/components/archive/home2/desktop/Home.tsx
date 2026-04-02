"use client";
import { useEffect, useRef } from "react";
import "@/styles/home/home.css";

function Home() {
    const heroRef = useRef<HTMLDivElement>(null);

    const scrollTo = (sectionId: string) => {
        const element = document.getElementById(sectionId);
        const prefersReduced = window.matchMedia(
            "(prefers-reduced-motion: reduce)",
        ).matches;
        if (element) {
            element.scrollIntoView({
                behavior: prefersReduced ? "auto" : "smooth",
            });
        }
    };

    useEffect(() => {
        const hero = heroRef.current;
        if (!hero) return;

        const scrollIndicator = hero.querySelector(
            ".scroll-indicator",
        ) as HTMLElement | null;
        if (!scrollIndicator) return;

        const prefersReduced = window.matchMedia(
            "(prefers-reduced-motion: reduce)",
        ).matches;

        const handleScroll = () => {
            if (prefersReduced) return;
            const opacity = Math.max(
                0,
                1 - window.scrollY / (window.innerHeight * 0.5),
            );
            scrollIndicator.style.opacity = opacity.toString();
        };

        const observer = new IntersectionObserver(
            ([entry]) => {
                scrollIndicator.classList.toggle(
                    "scroll-indicator-hidden",
                    !entry.isIntersecting,
                );
            },
            { threshold: 0.1 },
        );

        observer.observe(hero);

        window.addEventListener("scroll", handleScroll, { passive: true });
        handleScroll();

        return () => {
            observer.disconnect();
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return (
        <div className="home-container" ref={heroRef}>
            <div className="hero-wrapper">
                <div className="hero-content">
                    <div className="hero-text">
                        <h1 className="greeting">
                            I make interfaces
                            <br />
                            that feel alive.
                            <br />
                            I&apos;m{" "}
                            <span className="signature-underline">
                                SeongYeon Kim
                            </span>
                            .
                        </h1>
                        <p className="description">
                            I'm a student Frontend Developer
                            <br />
                            with a passion for crafting functional,
                            <br />
                            impactful experiences that resonate with users.
                        </p>
                        <div className="status-line">
                            <span
                                className="status-dot"
                                aria-hidden="true"
                            ></span>
                            Available for outsourcing projects
                        </div>
                        <div className="cta-group">
                            <button
                                type="button"
                                onClick={() => scrollTo("Portfolio")}
                                className="cta-button cta-primary"
                            >
                                View My Portfolio
                            </button>
                            <button
                                type="button"
                                onClick={() => scrollTo("Profile")}
                                className="cta-link"
                            >
                                Get in touch →
                            </button>
                        </div>
                        <div className="proof-chips">
                            <span className="chip">Hackathon Grand Prize</span>
                            <span className="chip">React / Next.js</span>
                            <span className="chip">Three.js</span>
                        </div>
                    </div>
                </div>
            </div>

            <button
                type="button"
                className="scroll-indicator"
                aria-label="Scroll to portfolio section"
                onClick={() => scrollTo("Portfolio")}
            >
                <span className="scroll-label">Scroll</span>
                <img
                    loading="lazy"
                    src="img/arrow.png"
                    className="arrow"
                    alt=""
                    aria-hidden="true"
                />
            </button>

            <div className="gradient-overlay" />
        </div>
    );
}

export default Home;
