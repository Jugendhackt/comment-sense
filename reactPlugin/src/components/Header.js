import React from "react"

import userSetting from "../assets/icons/userSetting32.png";

function Header(props) {
    return (
            <nav className="navbar sticky-top navbar-dark bg-primary mb-3">
                <div className="w-100 d-flex justify-content-between">
                    <a className="navbar-brand" href="#">{props.brand}</a>
                </div>
            </nav>
    )
}

export default Header;