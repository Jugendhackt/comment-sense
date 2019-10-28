import React from "react";
import { ErrDialog } from "./ErrDialog";

function index(props) {
    return (
        <ErrDialog {...props} />
    );
};

export { index as ErrDialog };