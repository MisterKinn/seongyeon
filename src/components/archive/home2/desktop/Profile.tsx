import "@/styles/home/profile.css";

const PROFILE_ROWS = [
    [
        {
            href: "mailto:kinn@kinn.kr",
            title: "Mail",
            image: "img/mail.png",
            value: "kinn@kinn.kr",
            imageClassName: "card-img3",
        },
        {
            href: "https://www.instagram.com/kinn__sy",
            title: "Instagram",
            image: "img/instagram.png",
            value: "kinn__sy",
            imageClassName: "card-img3",
        },
        {
            href: "https://discord.com/users/602459845534416896/",
            title: "Discord",
            image: "img/discord.png",
            value: "mrkinn",
            imageClassName: "card-img3",
        },
    ],
    [
        {
            href: "https://www.linkedin.com/in/%E3%85%A4seongyeon-kim-223994296/",
            title: "LinkedIn",
            image: "img/linkedin.png",
            value: "SeongYeon Kim",
            imageClassName: "card-img3",
        },
        {
            href: "https://github.com/MisterKinn",
            title: "GitHub",
            image: "img/github.png",
            value: "MisterKinn",
            imageClassName: "card-img3 discord",
        },
    ],
] as const;

function Profile() {
    return (
        <div className="desktop-profile" data-aos="fade-up">
            <h2 id="list" data-aos="fade-up">
                Profile
            </h2>
            <h3 id="explain" data-aos="fade-up">
                Build deeper connection with me in every ways.
                <br />
                Click the card to connect with me.
            </h3>
            {PROFILE_ROWS.map((row, rowIndex) => (
                <div key={`profile-row-${rowIndex}`} className="container3">
                    {row.map((profile) => (
                        <a
                            key={profile.title}
                            href={profile.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            title={profile.title}
                            className="spec"
                        >
                            <div className="card-container3">
                                <div>
                                    <div className="column-center3">
                                        <img
                                            loading="lazy"
                                            src={profile.image}
                                            className={profile.imageClassName}
                                            alt={`${profile.title} icon`}
                                        />
                                        <span className="card-title3">
                                            <strong> {profile.title}</strong>
                                        </span>
                                    </div>
                                    <div className="card-footer3">
                                        <strong>
                                            <br />
                                            {profile.value}
                                        </strong>
                                    </div>
                                </div>
                            </div>
                        </a>
                    ))}
                </div>
            ))}

            <div className="blank"></div>
        </div>
    );
}

export default Profile;
