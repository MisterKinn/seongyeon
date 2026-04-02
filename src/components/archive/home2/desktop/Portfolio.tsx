import "@/styles/home/portfolio.css";

const PROJECTS = [
    {
        title: "F1 Strategy Explorer",
        description:
            "Formula 1 tire strategy simulator that scores and compares race plans.",
        date: "2025.07.15 ~",
        href: "/f1strategy",
        image: "img/f1-logo.png",
        imageClass: "card-preview-small",
        tags: ["Next.js", "Data Viz", "Simulation"],
    },
    {
        title: "UniMatch",
        description:
            "University recommendation service for high school students based on SAT scores.",
        date: "2025.03.24 ~",
        href: "/unimatch",
        image: "img/unimatch.png",
        imageClass: "card-preview-small",
        tags: ["React", "Recommendation", "UX"],
    },
    {
        title: "UX Insight",
        description:
            "Website UX analysis service that inspects pages and returns actionable feedback.",
        date: "2024.10.20 ~",
        href: "/uxinsight",
        image: "img/ux.png",
        imageClass: "card-preview-small",
        tags: ["AI", "Web Analysis", "Product"],
    },
    {
        title: "TodayLunch",
        description:
            "School meal information platform with website and social media operation.",
        date: "2024.04.11 ~",
        href: "https://todaylun.ch",
        image: "img/todaylunch.png",
        imageClass: "card-preview",
        tags: ["Operations", "Growth", "Content"],
    },
    {
        title: "RoadMap",
        description:
            "Founded and operated a high school web development circle and community.",
        date: "2024.03.08 - 2025.11.23",
        href: "https://gmsh.kr",
        image: "img/road-map.png",
        imageClass: "card-preview-small",
        tags: ["Community", "Leadership", "Education"],
    },
    {
        title: "QR Crafter",
        description:
            "QR code generation service with instant download and easy link sharing.",
        date: "2023.12.08 ~",
        href: "/qr",
        image: "img/link.png",
        imageClass: "card-preview-small",
        tags: ["Utility", "Frontend", "Tooling"],
    },
    {
        title: "Machim",
        description:
            "Discord bot with server management and utility workflows for communities.",
        date: "2021.02.07 ~",
        href: "/machim",
        image: "img/Machim.png",
        imageClass: "card-preview-small2",
        tags: ["Bot", "Automation", "Community"],
    },
] as const;

function Portfolio() {
    return (
        <section id="Portfolio" className="portfolio-3d">
            <div className="portfolio-shell">
                <h2 id="list" data-aos="fade-up">
                    Portfolio
                </h2>
                <p id="explain" data-aos="fade-up">
                    Product-focused frontend work across experiments, real
                    services, and client delivery. Open any card to explore.
                </p>

                <div className="portfolio-grid" data-aos="fade-up">
                    {PROJECTS.map((project) => (
                        <a
                            key={project.title}
                            href={project.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="portfolio-item"
                            title={project.title}
                        >
                            <article className="portfolio-card">
                                <div className={project.imageClass}>
                                    <img
                                        loading="lazy"
                                        src={project.image}
                                        alt={`${project.title} preview`}
                                    />
                                </div>
                                <div className="card-info">
                                    <h3>{project.title}</h3>
                                    <p>{project.description}</p>
                                    <div className="card-tags">
                                        {project.tags.map((tag) => (
                                            <span key={tag} className="card-tag">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                    <div className="card-meta">
                                        <span className="date">{project.date}</span>
                                        <span className="card-cta">Open</span>
                                    </div>
                                </div>
                            </article>
                        </a>
                    ))}
                </div>
            </div>
            <div className="blank"></div>
        </section>
    );
}

export default Portfolio;
