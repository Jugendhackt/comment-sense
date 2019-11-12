import React from "react";
import {CommentList} from "./CommentList";

const index = (props) => {
    return (
        <CommentList {...props} />
    );
};

export { index as CommentList };