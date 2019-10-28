import React from "react";
import { SignIn } from "./SignIn";

function index(props) {
    return (
        <SignIn {...props} />
    );
};

export { index as SignIn };