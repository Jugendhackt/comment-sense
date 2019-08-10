import React, {Fragment} from "react";

function CreateComment(props) {
    return (
        <div className="bg-dark p-2" id="createComment">
            <div className="w-100 d-flex flex-column justify-content-center align-items-center">
                <h2>Dein Kommentar</h2>
                <small className="text-muted">Bitte alle Felder ausfüllen</small>
            </div>
            <div className="container">
                <div className="form-group">
                    <label>Titel</label>
                    <input className="form-control" placeholder="Dein Titel" />
                </div>
                <div className="form-group">
                    <label>Kommentar</label>
                    <div className="d-flex flex-column align-items-center">
                        <textarea rows="8" cols="30" placeholder="Dein Kommentar" className="form-control"></textarea>
                    </div>
                </div>
                <div className="d-flex w-100 justify-content-center">
                    <button className="btn btn-primary">Kommentar senden</button>
                </div>
            </div>
        </div>
    );
}

export default CreateComment;