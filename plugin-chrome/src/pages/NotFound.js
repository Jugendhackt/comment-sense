import React from "react";
import {Typography} from "@material-ui/core";
import {langDe} from "../constants";

const NotFound = (props) => {
    return (
        <>
            <Typography variant="h3">{langDe.notFoundTitle}</Typography>
            <Typography variant="body1">{langDe.notFoundText}</Typography>
        </>
    );
};

export default NotFound;