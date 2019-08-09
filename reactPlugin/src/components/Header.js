import React from "react"
import { BrowserRouter as Router, Route, Link} from "react-router-dom";

import userSetting from "../assets/icons/userSetting32.png";

function Header(props) {
    function test() {
        return (
            <h1>HI</h1>
        )
    }

    return (
        <Router>
            <nav className="navbar sticky-top navbar-dark bg-primary mb-3">
                <div className="w-100 d-flex justify-content-between">
                    <a className="navbar-brand" href="#">{props.brand}</a>
                    <Link to="/options/"><img src={userSetting} className="mt-1" height="32px" width="32px" /></Link>
                </div>
            </nav>
            <Route path="/options/" component={test}></Route>
        </Router>
    )
}

export default Header;