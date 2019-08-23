import React, { useState } from "react";
import { Collapse } from "reactstrap";

import CreateComment from "./CreateComment";

function FooterMain(props) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <div className={"footer-container"}>
                <Collapse isOpen={isOpen}>
                    <CreateComment lang={props.lang} ipAdress={props.ipAdress} />
                </Collapse>
                <footer className={"footer navbar-dark bg-primary d-flex justify-content-center align-items-center"}>
                    <button className={"btn btn-dark"} onClick={() => setIsOpen(!isOpen)}>{(isOpen) ? props.lang.back : props.lang.createComment}</button>
                </footer>
            </div>
        </>
    );
}

export default FooterMain;