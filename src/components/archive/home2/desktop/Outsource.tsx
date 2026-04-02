import "@/styles/home/portfolio.css";

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
                <a
                    href="#"
                    target="_blank"
                    title="DongDong Service"
                    className="portfolio-item outsource-item"
                >
                    <div className="portfolio-card">
                        <div className="card-preview outsource-preview">
                            <img
                                loading="lazy"
                                src="img/dongdong.png"
                                alt="DongDong Service Preview"
                            />
                        </div>
                        <div className="card-info">
                            <span className="outsource-badge">Client Work</span>
                            <h3>Accompany Service</h3>
                            <p>
                                Frontend development for 동반자동행, a mobile
                                app that pairs seniors with volunteer companions.
                            </p>
                            <div className="card-tags">
                                <span className="card-tag">React Native</span>
                                <span className="card-tag">Mobile</span>
                                <span className="card-tag">Frontend</span>
                            </div>
                            <div className="card-meta">
                                <span className="date">25. 12. 20. – 25. 12. 29.</span>
                                <span className="card-cta">View</span>
                            </div>
                        </div>
                    </div>
                </a>

                <a
                    href="https://uhak.prego.im"
                    target="_blank"
                    title="Prego Abroad"
                    className="portfolio-item outsource-item"
                >
                    <div className="portfolio-card">
                        <div className="card-preview outsource-preview">
                            <img
                                loading="lazy"
                                src="img/prego.png"
                                alt="Prego Abroad Preview"
                            />
                        </div>
                        <div className="card-info">
                            <span className="outsource-badge">Client Work</span>
                            <h3>Prego Abroad</h3>
                            <p>
                                Official website for Prego Abroad, an overseas
                                education consulting service.
                            </p>
                            <div className="card-tags">
                                <span className="card-tag">Next.js</span>
                                <span className="card-tag">Web</span>
                                <span className="card-tag">Consulting</span>
                            </div>
                            <div className="card-meta">
                                <span className="date">25. 11. 21. – 26. 01. 12.</span>
                                <span className="card-cta">View</span>
                            </div>
                        </div>
                    </div>
                </a>

                <a
                    href="https://novalaw.kr"
                    target="_blank"
                    title="Nova Law Firm"
                    className="portfolio-item outsource-item"
                >
                    <div className="portfolio-card">
                        <div className="card-preview outsource-preview">
                            <img
                                loading="lazy"
                                src="img/novalaw.png"
                                alt="Nova Law Firm Preview"
                            />
                        </div>
                        <div className="card-info">
                            <span className="outsource-badge">Client Work</span>
                            <h3>Nova Law Firm</h3>
                            <p>
                                Official website for NovaLaw, a law firm based
                                in Incheon, Songdo.
                            </p>
                            <div className="card-tags">
                                <span className="card-tag">Next.js</span>
                                <span className="card-tag">Web</span>
                                <span className="card-tag">Legal</span>
                            </div>
                            <div className="card-meta">
                                <span className="date">24. 07. 11.</span>
                                <span className="card-cta">View</span>
                            </div>
                        </div>
                    </div>
                </a>
            </div>

            <div className="blank"></div>
        </div>
    );
}
