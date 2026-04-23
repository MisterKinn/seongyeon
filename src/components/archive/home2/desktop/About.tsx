const ABOUT_IDENTITY = {
    name: "SeongYeon Kim",
    nickname: "Kinn",
    role: "FrontEnd Developer",
    age: "19",
    grade: "Junior",
} as const;

const ABOUT_MOTTO_LINES = [
    "I care about the reality of the goodness,",
    "not the perception of it.",
] as const;

type AboutGoalLine = {
    prefix: string;
    highlight: string;
    suffix?: string;
    highlight2?: string;
    ending?: string;
};

const ABOUT_GOAL_LINES: readonly AboutGoalLine[] = [
    {
        prefix: "I'm going to work at ",
        highlight: "Startup",
        suffix: " as a ",
        highlight2: "Developer",
        ending: ",",
    },
    {
        prefix: "and eventually I'll be ",
        highlight: "a Successful Entrepreneur",
    },
    {
        prefix: "and be the citizen of the ",
        highlight: "U.S.A.",
    },
] as const;

function About() {
    return (
        <div id="About">
            <h1 className="About" data-aos="fade-up">
                About Me
            </h1>
            <p data-aos="fade-up">
                <span className="white">Hello!</span> My name is{" "}
                <span className="white">{ABOUT_IDENTITY.name}</span> (a.k.a.
                <span className="white">{ABOUT_IDENTITY.nickname}</span>),
                <br />
                and I'm a student{" "}
                <span className="white">{ABOUT_IDENTITY.role}.</span>
                <br />
                I'm fan of{" "}
                <img
                    loading="lazy"
                    src="img/usa.webp"
                    alt="the United States of America"
                    className="usa"
                />{" "}
                &{" "}
                <a
                    href="https://f1.com"
                    target="_blank"
                    title="Formula 1"
                    className="link"
                >
                    <img loading="lazy" src="img/f1.png" className="f1" />
                </a>
                <strong>.</strong>
                <br />
                <br />
                My motto is{" "}
                <span className="motto-text">
                    <span className="white">
                        &quot;{ABOUT_MOTTO_LINES[0]}
                        <br />
                        {ABOUT_MOTTO_LINES[1]}&quot;
                    </span>
                    .
                </span>
                <br />
                <br />
                I'm <span className="white">{ABOUT_IDENTITY.age}</span> years
                old,
                <br />
                and <span className="white">{ABOUT_IDENTITY.grade}</span> of
                high school.
                <br />
                <br />
                {ABOUT_GOAL_LINES.map((goalLine, index) => (
                    <span key={`about-goal-${index}`}>
                        {goalLine.prefix}
                        <span className="white">{goalLine.highlight}</span>
                        {goalLine.suffix ?? ""}
                        {goalLine.highlight2 && (
                            <span className="white">{goalLine.highlight2}</span>
                        )}
                        {goalLine.ending ?? ""}
                        {index < ABOUT_GOAL_LINES.length - 1 && <br />}
                    </span>
                ))}
            </p>
        </div>
    );
}

export default About;
