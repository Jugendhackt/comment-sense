import React from "react";
import {Link} from "react-router-dom";

import settings from "../../assets/icons/userSetting32.png";

function Header(props) {
    return (
        <nav className="navbar sticky-top navbar-dark bg-primary mb-3">
            <div className="w-100 d-flex justify-content-between align-items-center">
                <Link to="/index.html">
                    <span className="navbar-brand">{props.lang.navbarBrand}</span>
                </Link>
                <Link to="/user/">
                    <img src={settings} alt={props.lang.settings} height="32px" width="32px"/>
                </Link>
            </div>
        </nav>
    );
}

export default Header;