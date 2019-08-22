import React from "react";

import Navbar from "./Navbar";

function HeaderMain(props) {
    return (
        <Navbar lang={props.lang}/>
    );
}

export default HeaderMain;