import "@/styles/home/portfolio.css";

const OUTSOURCE_PROJECTS = [
    {
        href: "#",
        title: "DongDong Service",
        cardTitle: "Accompany Service",
        description:
            "Frontend development for 동반자동행, a mobile app that pairs seniors with volunteer companions.",
        image: "img/dongdong.png",
        imageAlt: "DongDong Service Preview",
        tags: ["React Native", "Mobile", "Frontend"],
        date: "25. 12. 20. - 25. 12. 29.",
    },
    {
        href: "https://uhak.prego.im",
        title: "Prego Abroad",
        cardTitle: "Prego Abroad",
        description:
            "Official website for Prego Abroad, an overseas education consulting service.",
        image: "img/prego.png",
        imageAlt: "Prego Abroad Preview",
        tags: ["Next.js", "Web", "Consulting"],
        date: "25. 11. 21. - 26. 01. 12.",
    },
    {
        href: "https://novalaw.kr",
        title: "Nova Law Firm",
        cardTitle: "Nova Law Firm",
        description:
            "Official website for NovaLaw, a law firm based in Incheon, Songdo.",
        image: "img/novalaw.png",
        imageAlt: "Nova Law Firm Preview",
        tags: ["Next.js", "Web", "Legal"],
        date: "24. 04. 03. - 24. 07. 11.",
    },
    {
        href: "https://thegrant.kr",
        title: "TheGrant AI",
        cardTitle: "TheGrant AI",
        description:
            "Official website for TheGrant, an AI SaaS that helps writing a business plan.",
        image: "img/thegrant.ico",
        imageAlt: "TheGrant AI Preview",
        tags: ["React", "Web", "AI"],
        date: "26. 01. 26. - 26. 02. 13.",
    },
] as const;

export default function Outsource() {
    return (
        <div className="outsource-section" data-aos="fade-up">
            <h2 id="list">Outsource</h2>
            <h3 id="explain">
                Building extraordinary outsourcing results that pleases the
                clients.
                <br />
                Click the card to see the detail.
            </h3>

            <div className="portfolio-grid" data-aos="fade-up">
                {OUTSOURCE_PROJECTS.map((project) => (
                    <a
                        key={project.title}
                        href={project.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        title={project.title}
                        className="portfolio-item outsource-item"
                    >
                        <div className="portfolio-card">
                            <div className="card-preview outsource-preview">
                                <img
                                    loading="lazy"
                                    src={project.image}
                                    alt={project.imageAlt}
                                />
                            </div>
                            <div className="card-info">
                                <span className="outsource-badge">
                                    Client Work
                                </span>
                                <h3>{project.cardTitle}</h3>
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
                                    <span className="card-cta">View</span>
                                </div>
                            </div>
                        </div>
                    </a>
                ))}
            </div>

            <div className="blank"></div>
        </div>
    );
}
