import React from "react";

function Website(props) {
    return (
        <>
            <div className="list-group-item list-group-item-action mb-2">
                <div className="d-flex w-100 justify-content-between">
                    <h5 className="mb-3">{props.website}</h5>
                    <small className="text-muted">{`${props.lang.comments}: ${props.comments}`}</small>
                </div>
                <a href={props.url} className="btn btn-primary">{props.lang.linkToWebsite}</a>
            </div>
        </>
    );
}

export default Website;