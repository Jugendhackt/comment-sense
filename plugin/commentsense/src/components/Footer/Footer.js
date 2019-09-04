/*global chrome*/
import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import { Collapse } from "reactstrap";
import bootbox from "bootbox";

import CreateComment from "./CreateComment";
import ipAdress from "../../ipAdress";

function Footer(props) {
    const [isOpenComment, setIsOpenComment] = useState(false);
    const [loggedIn, setLoggedIn] = useState(false);

    useEffect(() => {
        chrome.storage.local.get(["username", "password"], result => {
            if (typeof result.username != "undefined" && typeof result.password != "undefined") {
                fetch(`${ipAdress}/users/login/`, {
                    method: "POST",
                    body: JSON.stringify({
                        userName: result.username,
                        password: result.password
                    })
                })
                    .then(res => res.json())
                    .then(res => {
                        if (res.status === "login data valid") {
                            setLoggedIn(true);
                        } else {
                            setLoggedIn(false);
                        }
                    })
                    .catch(e => {
                        bootbox.alert(props.lang.serverNotReachable);
                    })
            }
        });
    }, []);

    return (
        <div className="footer-container">
            <Collapse isOpen={isOpenComment}>
                <CreateComment lang={props.lang}/>
            </Collapse>
            <footer className="footer navbar-dark bg-primary d-flex justify-content-center align-items-center">
                <button className="btn btn-dark" onClick={() => (loggedIn) ? setIsOpenComment(!isOpenComment) : props.history.push("/user/")}>{(isOpenComment) ? props.lang.back : props.lang.createComment}</button>
            </footer>
        </div>
    );
}

export default withRouter(Footer);