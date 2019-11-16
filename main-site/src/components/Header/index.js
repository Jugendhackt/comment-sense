import React from "react";
import { Navbar } from "./Navbar";

const index = (props) => {
    return (
        <Navbar {...props} />
    );
};

export { index as Header };