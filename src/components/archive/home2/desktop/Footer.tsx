const COPYRIGHT_NAME = "Kinn";

function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <div>
            <p className="footer-text">
                &copy; <span id="copyright-year">{currentYear}</span>{" "}
                <strong>{COPYRIGHT_NAME}</strong>.
                <span className="footer-line-break" aria-hidden="true">
                    <br />
                </span>{" "}
                All Rights Reserved.
            </p>
        </div>
    );
}

export default Footer;
