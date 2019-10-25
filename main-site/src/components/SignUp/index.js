import React from "react";
import { SignUp } from "./SignUp";

function index(props) {
    return (
        <SignUp {...props} />
    );
};

export { index as SignUp };