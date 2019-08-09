import React, {useState} from "react"
import {Collapse} from "reactstrap";

import CreateComment from "./CreateComment";

function Footer(props) {
    const [isOpen, setIsOpen] = useState(false);
    const [name, setName] = useState("Kommentar erstellen");
    function handleClick() {
        if (isOpen) {
            setIsOpen(false);
            setName("Kommentar erstellen");
        } else{
            setIsOpen(true);
            setName("Zurück");
        }
    }

    return (
        <div className="footerContainer">
            <Collapse isOpen={isOpen}>
                <CreateComment onClick={handleClick} />
            </Collapse>
            <footer className="footer navbar-dark bg-primary d-flex justify-content-center align-items-center">
                <button className="btn btn-dark" onClick={handleClick}>{name}</button>
            </footer>
        </div>
    )
}

export default Footer;