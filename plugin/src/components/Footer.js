import React, { useState } from "react";
import { Collapse } from "reactstrap";

import CreateComment from "./CreateComment";

function Footer(props) {
    const [isOpen, setIsOpen] = useState(false);
    const [btnName, setBtnName] = useState("Kommentar erstellen");

    function handleCollapse() {
        if (isOpen && btnName === "Zurück") {
            setIsOpen(false);
            setBtnName("Kommentar erstellen");
        } else if (isOpen === false && btnName === "Kommentar erstellen"){
            setIsOpen(true);
            setBtnName("Zurück");
        }
    }

    return (
        <div>
            <Collapse isOpen={isOpen}>
                <div>
                    <CreateComment />
                </div>
            </Collapse>
            <footer className="footer navbar-dark bg-primary d-flex justify-content-center align-items-center" >
                <button className="btn btn-dark" onClick={() => handleCollapse()}>{btnName}</button>
            </footer>
        </div>
    )
}

export default Footer;