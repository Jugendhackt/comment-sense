/*global chrome*/
import React, { useState } from "react";


function CreateComment(props) {
    const [title, setTitle] = useState("");
    const [comment, setComment] = useState("");

    const ipAdress = "http://192.168.2.105";

    function onClick() {
        if (title !== "" && comment !== "") {
            fetch(ipAdress + "/comments/", {
                method: "POST",
                body: JSON.stringify({
                    userName: "user 1",
                    password: "password 1",
                    headline: title,
                    content: comment,
                    url: "https://www.google.de"
                })
                    .then((res) => {
                        console.log(res);
                    })
            })
        }
    }

    function getUserData() {
        return new Promise(resolve => {
            chrome.storage.local.get(["username", "password"], result => {
                if (typeof result.username !== undefined && typeof result.password !== undefined)
                    resolve(result);
            });
        });
    }

    return (
        <div className="createComment navbar-dark bg-dark p-2">
            <div className="w-100 d-flex flex-column justify-content-center align-items-center">
                <h2>Dein Kommentar</h2>
                <small className="text-muted">Bitte fülle alle Felder aus</small>
            </div>
            <div className="container-fluid">
                <div className="form-group">
                    <label>Titel</label>
                    <input placeholder="Dein Titel" className="form-control" onChange={(evt) => setTitle(evt.target.value)} value={title} />
                </div>
                <div className="form-group">
                    <label>Kommentar</label>
                    <div className="d-flex flex-column align-items-center">
                        <textarea placeholder="Dein Kommentar" rows="8" cols="30" className="form-control" onChange={(evt) => setComment(evt.target.value)} value={comment}></textarea>
                    </div>
                </div>
                <div className="d-flex w-100 justify-content-center">
                    <button className="btn btn-primary" type="button" onClick={() => {
                        props.onClick();
                        onClick();
                    }
                    }>Senden</button>
                </div>
            </div>
        </div>
    )


}

export default CreateComment;