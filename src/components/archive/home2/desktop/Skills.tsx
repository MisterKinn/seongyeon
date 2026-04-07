"use client";

import "@/styles/home/skills.css";

const SKILL_ROWS = [
    [
        { name: "HTML", image: "img/html.png", since: "20. 07. 09~" },
        { name: "CSS", image: "img/css.png", since: "20. 08. 16~" },
        { name: "JavaScript", image: "img/js.png", since: "21. 01. 13~" },
    ],
    [
        { name: "React", image: "img/react.png", since: "23. 05. 12~" },
        { name: "Next.js", image: "img/next.png", since: "24. 02. 17~" },
        { name: "Three.js", image: "img/3js.png", since: "25. 12. 09~" },
    ],
] as const;

function Skills() {
    return (
        <div id="Skills" className="desktop-skills">
            <h2 id="list" data-aos="fade-up">
                Skills
            </h2>
            <h3 id="explain" data-aos="fade-up">
                Creating immersive web experiences with cutting-edge
                technologies.
            </h3>
            {SKILL_ROWS.map((row, rowIndex) => (
                <div
                    key={`skill-row-${rowIndex}`}
                    className="container"
                    data-aos="fade-up"
                >
                    {row.map((skill) => (
                        <div key={skill.name} className="spec2">
                            <div className="card-container2">
                                <div>
                                    <div className="column-center">
                                        <img
                                            loading="lazy"
                                            src={skill.image}
                                            className="card-img2"
                                            alt={`${skill.name} logo`}
                                        />
                                        <span className="card-title2">
                                            <strong>{skill.name}</strong>
                                        </span>
                                    </div>
                                    <div className="card-footer2">
                                        <strong>
                                            <br />
                                            {skill.since}
                                        </strong>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ))}

            <div className="blank"></div>
        </div>
    );
}

export default Skills;
