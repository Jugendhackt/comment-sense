import React from "react";
import { Typography } from "@material-ui/core";
import { langDe } from "../constants";

function NotFound(props) {
    return (
        <>
            <Typography variant="h3">{langDe.notFoundTitle}</Typography>
            <Typography variant="p">{langDe.notFoundText}</Typography>
        </>
    );
};

export { NotFound };