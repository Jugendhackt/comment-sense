import React from "react";
import {TopWebsites} from "./TopWebsites";

function index(props) {
    return (
        <TopWebsites {...props} />
    );
};

export {index as TopWebsites};