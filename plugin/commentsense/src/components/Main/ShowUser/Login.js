import React from "react";

function Login(props) {

    return (
        <>
            <small className="text-muted">{props.lang.fillAllFields}</small>
            <div className="form-group">
                <label>{props.lang.username}</label>
                <input className="form-control" value={props.username} onChange={props.changeUsername} />
            </div>
            <div className="form-group">
                <label>{props.lang.password}</label>
                <input className="form-control" value={props.password} onChange={props.changePassword} />
            </div>
            <div className="form-group">
                <button className="btn btn-primary" onClick={props.save}>{props.lang.save}</button>
            </div>
        </>
    );
}

export default Login;