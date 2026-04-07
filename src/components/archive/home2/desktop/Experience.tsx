import "@/styles/home/experience.css";

const EXPERIENCE_GROUPS = [
    {
        year: "2021",
        items: [
            {
                title: "Gifted Education Center",
                href: "experience/education",
                image: "img/education.png",
                imageAlt: "Gifted Education Center",
                descriptionLines: [
                    "Graduated from the Gifted Education Center",
                    "hosted by Gyeonggi Goyang Office of Education.",
                ],
                date: "21. 09. 17 - 21. 11. 01",
                category: "Education",
                overlayLines: [
                    "Click to learn more about",
                    "Gifted Education Center",
                ],
            },
        ],
    },
    {
        year: "2024",
        items: [
            {
                title: "Highthon",
                href: "experience/highthon",
                image: "img/trophy.png",
                imageAlt: "Highthon",
                descriptionLines: [
                    "Secured a Grand Prize at Highthon,",
                    "a prestigious hackathon for high school students.",
                ],
                date: "24. 02. 17 - 24. 02. 18",
                category: "Hackathon",
                overlayLines: ["Click to learn more about Highthon"],
            },
            {
                title: "RoadMap",
                href: "https://gmsh.kr",
                image: "img/road-map.png",
                imageAlt: "RoadMap",
                descriptionLines: [
                    "Founded and operated RoadMap,",
                    "a web development circle in my high school.",
                ],
                date: "24. 03. 08 ~ 25.11.23.",
                category: "Circle",
                overlayLines: ["Click to learn more about RoadMap"],
            },
            {
                title: "NovaLaw Outsource",
                href: "experience/novalaw",
                image: "img/outsource.png",
                imageAlt: "NovaLaw Outsource",
                descriptionLines: [
                    "Built the official website for NovaLaw,",
                    "a law firm in Incheon, Songdo.",
                ],
                date: "24. 03. 31 - 24. 08. 13",
                category: "Outsource",
                overlayLines: [
                    "Click to learn more about",
                    "NovaLaw Outsource",
                ],
            },
        ],
    },
    {
        year: "2025",
        items: [
            {
                title: "Prego Abroad Outsource",
                href: "https://uhak.prego.im",
                image: "img/uhak.png",
                imageAlt: "Prego Abroad Outsource",
                descriptionLines: [
                    "Built the official website for Prego Abroad,",
                    "an overseas education consulting service.",
                ],
                date: "25. 11. 21 - 26. 01. 12",
                category: "Outsource",
                overlayLines: [
                    "Click to learn more about",
                    "Prego Abroad Outsource",
                ],
            },
            {
                title: "DongDong Outsource",
                href: "#",
                image: "img/dong.png",
                imageAlt: "DongDong Outsource",
                descriptionLines: [
                    "Built the frontend for 동반자동행 app,",
                    "an accompany service for seniors.",
                ],
                date: "25. 12. 20 - 25. 12. 29",
                category: "Outsource",
                overlayLines: [
                    "Click to learn more about",
                    "DongDong Outsource",
                ],
            },
        ],
    },
    {
        year: "2026",
        items: [
            {
                title: "TheGrant Outsource",
                href: "#",
                image: "img/thegrant.ico",
                imageAlt: "TheGrant Outsource",
                descriptionLines: [
                    "Built the official website for TheGrant,",
                    "an AI SaaS that helps writing a business plan.",
                ],
                date: "26. 01. 26 - 26. 02. 13",
                category: "Outsource",
                overlayLines: [
                    "Click to learn more about",
                    "TheGrant Outsource",
                ],
            },
        ],
    },
] as const;

function Experience() {
    return (
        <div>
            <div className="experience-header">
                <h2 id="list" data-aos="fade-up">
                    Experience
                </h2>
                <h3 id="explain" data-aos="fade-up">
                    Explore my journey of learning and growth
                    <br />
                    through invaluable opportunities.
                    <br />
                    Click the card to see the detail.
                </h3>
            </div>

            <div className="page-container">
                <div className="content-wrapper">
                    <div className="timeline">
                        {EXPERIENCE_GROUPS.map((group) => (
                            <div key={group.year}>
                                <div
                                    className="timeline-year"
                                    data-aos="fade-up"
                                >
                                    {group.year}
                                </div>
                                {group.items.map((item) => (
                                    <div
                                        key={item.title}
                                        className="timeline-item"
                                        data-aos="fade-up"
                                    >
                                        <div className="timeline-marker"></div>
                                        <a
                                            href={item.href}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            title={item.title}
                                            className="timeline-content"
                                        >
                                            <div className="experience-glow"></div>
                                            <div className="timeline-header">
                                                <img
                                                    loading="lazy"
                                                    src={item.image}
                                                    className="timeline-img"
                                                    alt={item.imageAlt}
                                                />
                                                <span className="experience-title">
                                                    {item.title}
                                                </span>
                                            </div>
                                            <div className="timeline-text">
                                                <span className="experience-description">
                                                    {item.descriptionLines.map(
                                                        (line, lineIndex) => (
                                                            <span
                                                                key={`${item.title}-description-${lineIndex}`}
                                                            >
                                                                {line}
                                                                {lineIndex <
                                                                    item
                                                                        .descriptionLines
                                                                        .length -
                                                                        1 && (
                                                                    <>
                                                                        <br />
                                                                    </>
                                                                )}
                                                            </span>
                                                        ),
                                                    )}
                                                </span>
                                                <div className="experience-meta">
                                                    <span>{item.date}</span>
                                                    <span>{item.category}</span>
                                                </div>
                                            </div>
                                            <div className="overlay">
                                                <span>
                                                    {item.overlayLines.map(
                                                        (line, lineIndex) => (
                                                            <span
                                                                key={`${item.title}-overlay-${lineIndex}`}
                                                            >
                                                                {line}
                                                                {lineIndex <
                                                                    item
                                                                        .overlayLines
                                                                        .length -
                                                                        1 && (
                                                                    <>
                                                                        <br />
                                                                    </>
                                                                )}
                                                            </span>
                                                        ),
                                                    )}
                                                </span>
                                            </div>
                                        </a>
                                    </div>
                                ))}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Experience;
