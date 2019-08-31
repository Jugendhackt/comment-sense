import React from "react";

function InputComment(props) {
    return (
        <div className={"form-group"}>
            <label htmlFor={props.name}>{props.labelName}</label>
            <input className={"form-control"} placeholder={props.placeholder} value={props.value} onChange={props.onChange} name={props.name}/>
        </div>
    );
}

export default InputComment;