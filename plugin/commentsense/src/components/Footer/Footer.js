import React, {useState} from "react";
import {withRouter} from "react-router-dom";
import {Collapse} from "reactstrap";

import CreateComment from "./CreateComment";

function Footer(props) {
    const [isOpen, setIsOpen] = useState(false);

    function handleOnClick() {
        if (props.loggedIn)
            setIsOpen(!isOpen);
        else
            props.history.push("/user/");
    }

    return (
        <div className="footer-container">
            <Collapse isOpen={isOpen}>
                <CreateComment lang={props.lang} username={props.username} password={props.password}/>
            </Collapse>
            <footer className="footer navbar-dark bg-primary d-flex justify-content-center align-items-center">
                <button className="btn btn-dark" onClick={() => handleOnClick()}>
                    {(isOpen) ? props.lang.back : props.lang.createComment}</button>
            </footer>
        </div>
    );
}

export default withRouter(Footer);