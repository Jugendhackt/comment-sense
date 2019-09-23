import React, {useState, useEffect} from "react";
import {Link} from "react-router-dom";
import {Collapse} from "reactstrap";

function Header(props) {

    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        if (window.screen.width >= 992) {
            setIsOpen(true);
        }
    }, []);

    return (
        <>
            <nav className="navbar sticky-top navbar-expand-lg navbar-dark bg-primary mb-3">
                <Link to="/">
                    <div className="navbar-brand">{props.lang.navbarBrand}</div>
                </Link>
                <button className="navbar-toggler" type="button"
                        style={(window.screen.width >= 992) ? {display: "none"} : null}
                        onClick={() => setIsOpen(!isOpen)}>
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="navbar-collapse">
                    <Collapse isOpen={(window.screen.width >= 992) ? true: isOpen}>
                        <ul className="navbar-nav mr-auto">
                            <Link to="/">
                                <div className="nav-link">Home</div>
                            </Link>
                            <Link to="/login/">
                                <div className="nav-link">{props.lang.login}</div>
                            </Link>
                            <Link to="/create/">
                                <div className="nav-link">{props.lang.createAccount}</div>
                            </Link>
                            <a href="https://www.github.com/Jugendhackt/comment-sense"
                               className="nav-link">{props.lang.github}</a>
                        </ul>
                    </Collapse>
                </div>
            </nav>
        </>
    );
}

export default Header;