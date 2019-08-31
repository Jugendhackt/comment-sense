import React from "react";

function TextAreaComment(props) {
    return (
        <div className={"form-group"}>
            <label htmlFor={props.name}>{props.labelName}</label>
            <textarea className={"form-control"} rows={props.rows} cols={props.cols} placeholder={props.placeholder}
            onChange={props.onChange} value={props.value}></textarea>
        </div>
    );
}

export default TextAreaComment;