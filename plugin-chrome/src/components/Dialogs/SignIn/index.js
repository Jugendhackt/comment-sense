import React from "react";
import { SignIn } from "./SignIn";

const index = (props) => {
    return (
        <SignIn {...props} />
    );
};

export { index as SignIn };