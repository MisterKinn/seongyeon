"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import "@/styles/navbar.css";

const NAV_LINKS = [
    { href: "../#Home", label: "Home" },
    { href: "../#Portfolio", label: "Portfolio" },
    { href: "../#Outsource", label: "Outsource" },
    { href: "../#Experience", label: "Experience" },
    { href: "../#Skills", label: "Skills" },
    { href: "../#Profile", label: "Profile" },
];

function NavBar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [activeHash, setActiveHash] = useState("#Home");

    const closeMenu = () => setIsMenuOpen(false);

    useEffect(() => {
        const syncActiveHash = () => {
            setActiveHash(window.location.hash || "#Home");
        };

        syncActiveHash();
        window.addEventListener("hashchange", syncActiveHash);

        return () => {
            window.removeEventListener("hashchange", syncActiveHash);
        };
    }, []);

    return (
        <nav id="nav-bar" className={isMenuOpen ? "menu-open" : ""}>
            <button
                type="button"
                className="nav-toggle"
                onClick={() => setIsMenuOpen(true)}
                aria-label="Open navigation menu"
            >
                <img src="img/openbtn.png" alt="" />
            </button>

            {isMenuOpen && (
                <div
                    className="nav-overlay"
                    onClick={closeMenu}
                    aria-hidden="true"
                />
            )}

            <div
                className={`nav-drawer ${isMenuOpen ? "open" : ""}`}
                aria-hidden={!isMenuOpen}
            >
                <button
                    type="button"
                    className="nav-close"
                    onClick={closeMenu}
                    aria-label="Close navigation menu"
                >
                    <img src="img/sidebar-close.png" alt="" />
                </button>

                {NAV_LINKS.map(({ href, label }) => {
                    const hash = href.slice(href.indexOf("#"));
                    return (
                        <Link
                            key={href}
                            href={href}
                            className="drawer-link"
                            onClick={() => {
                                setActiveHash(hash);
                                closeMenu();
                            }}
                            scroll={true}
                            aria-current={activeHash === hash ? "page" : undefined}
                        >
                            {label}
                        </Link>
                    );
                })}
            </div>

            <div className="topnav">
                {NAV_LINKS.map(({ href, label }) => {
                    const hash = href.slice(href.indexOf("#"));
                    return (
                        <Link
                            key={href}
                            href={href}
                            className="nav-link"
                            scroll={true}
                            onClick={() => setActiveHash(hash)}
                            aria-current={activeHash === hash ? "page" : undefined}
                        >
                            <strong>{label}</strong>
                        </Link>
                    );
                })}
            </div>
        </nav>
    );
}

export default NavBar;
