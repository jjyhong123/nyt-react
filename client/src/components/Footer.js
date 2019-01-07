import React from "react";
import NYTLogo from "../util/images/nyt_logo.png"

const Footer = () => (
    <div className="footer text-center">
        <p>Powered by <img src={NYTLogo} /> Article Search API.</p>
    </div>
)

export default Footer;