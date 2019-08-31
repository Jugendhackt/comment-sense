import React from "react";
import {Route} from "react-router-dom";

import ShowUser from "./ShowUser/ShowUser";
import CommentList from "./CommentList/CommentList";

function Main(props) {
    return (
        <main className="container">
            <Route exact path="/index.html" render={(para) => <CommentList lang={props.lang} ipAdress={props.ipAdress} {...para}/>}></Route>
            <Route path="/user/" render={(para) => <ShowUser lang={props.lang} ipAdress={props.ipAdress} {...para}/>} ></Route>
        </main>
    );
}

export default Main;