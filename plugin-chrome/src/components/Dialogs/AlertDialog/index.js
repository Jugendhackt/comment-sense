import React from "react";
import { AlertDialog } from "./AlertDialog";

function index(props) {
    return (
        <AlertDialog {...props} />
    );
};

export { index as AlertDialog };