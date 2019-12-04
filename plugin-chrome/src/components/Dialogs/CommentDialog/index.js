import React from "react";
import { Comment } from "./Comment";

const index = (props) => {
    return (
        <Comment {...props} />
    )
};

export { index as Comment };