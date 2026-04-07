const BANNER = {
    href: "https://kinn.kr/",
    title: "Kinn's Lounge",
    image: "../img/kinn-banner.png",
    alt: "Kinn's Lounge",
} as const;

function Banner() {
    return (
        <div id="Banner">
            <a
                href={BANNER.href}
                target="_blank"
                rel="noopener noreferrer"
                title={BANNER.title}
            >
                <img
                    loading="lazy"
                    src={BANNER.image}
                    alt={BANNER.alt}
                    className="banner margin10"
                />
            </a>
        </div>
    );
}

export default Banner;
