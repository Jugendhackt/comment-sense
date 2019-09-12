/*global chrome*/
import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import { Collapse } from "reactstrap";

import CreateComment from "./CreateComment";

function Footer(props) {
    const [isOpenComment, setIsOpenComment] = useState(false);

    return (
        <div className="footer-container">
            <Collapse isOpen={isOpenComment}>
                <CreateComment lang={props.lang}/>
            </Collapse>
            <footer className="footer navbar-dark bg-primary d-flex justify-content-center align-items-center">
                <button className="btn btn-dark" onClick={() => (props.loggedIn) ? setIsOpenComment(!isOpenComment) : props.history.push("/user/")}>{(isOpenComment) ? props.lang.back : props.lang.createComment}</button>
            </footer>
        </div>
    );
}

export default withRouter(Footer);