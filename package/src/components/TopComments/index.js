import React from "react";
import { TopComments } from "./TopComments";

function index(props) {
    return (
        <TopComments {...props} />
    );
};

export { index as TopComments };