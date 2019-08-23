import React, {useState} from "react";

import InputComment from "./ComponentsFooter/InputComment";
import TextAreaComment from "./ComponentsFooter/TextAreaComment";

function CreateComment(props) {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    return (
        <div className={"navbar-dark bg-dark p-2"}>
            <div className={"w-100 d-flex flex-column justify-content-center align-items-center"}>
                <h2>{props.lang.yourComment}</h2>
                <small className={"text-muted"}></small>
            </div>
            <div className={"container-fluid"}>
                <InputComment labelName={props.lang.title} placeholder={props.lang.titleOfComment} value={title}
                onChange={(evt) => setTitle(evt.target.value)} name={"title"}/>
                <TextAreaComment labelName={props.lang.content} placeholder={props.lang.contentOfComment} value={content}
                onChange={(evt) => setContent(evt.target.value)} name={"content"} rows={"8"} cols={"30"}/>
            </div>
        </div>
    );
}

export default CreateComment;