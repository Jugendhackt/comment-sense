import React from "react";
import { Navbar } from "./Navbar";

function index(props) {
    return (
        <Navbar {...props} />
    );
};

export { index as Header};