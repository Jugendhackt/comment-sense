import React from "react";

import settings from "../assets/icons/userSetting32.png";

function Header(props) {

    return (
        <nav className="navbar sticky-top navbar-dark bg-primary mb-3">
            <div className="w-100 d-flex justify-content-between align-items-center">
                <span className="navbar-brand" >CommentSense</span>
                <img src={settings} alt="Einstellungen" height="32px" width="32px"/>
            </div>
        </nav>
    )
}

export default Header;