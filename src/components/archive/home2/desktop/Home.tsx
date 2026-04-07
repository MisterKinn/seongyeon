"use client";
import { useEffect, useRef } from "react";
import "@/styles/home/home.css";

const HERO_CONTENT = {
    greetingLines: ["I make interfaces", "that feel alive."],
    name: "SeongYeon Kim",
    descriptionLines: [
        "I'm a student Frontend Developer",
        "with a passion for crafting functional,",
        "impactful experiences that resonate with users.",
    ],
    status: "Available for outsourcing projects",
} as const;

const HERO_ACTIONS = [
    {
        label: "View My Portfolio",
        sectionId: "Portfolio",
        className: "cta-button cta-primary",
    },
    {
        label: "Get in touch →",
        sectionId: "Profile",
        className: "cta-link",
    },
] as const;

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
                            {HERO_CONTENT.greetingLines[0]}
                            <br />
                            {HERO_CONTENT.greetingLines[1]}
                            <br />
                            I&apos;m{" "}
                            <span className="signature-underline">
                                {HERO_CONTENT.name}
                            </span>
                            .
                        </h1>
                        <p className="description">
                            {HERO_CONTENT.descriptionLines.map(
                                (line, index) => (
                                    <span key={`hero-description-${index}`}>
                                        {line}
                                        {index <
                                            HERO_CONTENT.descriptionLines
                                                .length -
                                                1 && <br />}
                                    </span>
                                ),
                            )}
                        </p>
                        <div className="status-line">
                            <span
                                className="status-dot"
                                aria-hidden="true"
                            ></span>
                            {HERO_CONTENT.status}
                        </div>
                        <div className="cta-group">
                            {HERO_ACTIONS.map((action) => (
                                <button
                                    key={action.sectionId}
                                    type="button"
                                    onClick={() => scrollTo(action.sectionId)}
                                    className={action.className}
                                >
                                    {action.label}
                                </button>
                            ))}
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
