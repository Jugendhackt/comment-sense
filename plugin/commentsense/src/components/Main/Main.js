import React from "react";
import {Route, Switch} from "react-router-dom";

import ShowUser from "./ShowUser/ShowUser";
import CommentList from "./CommentList/CommentList";
import ErrorPage from "./Error/Error";

function Main(props) {
    return (
        <main className="container">
            <Switch>
                <Route exact path="/index.html"
                       render={(para) => <CommentList lang={props.lang} {...para} loggedIn={props.loggedIn}
                                                      username={props.username} password={props.password}/>}/>
                <Route path="/user/"
                       render={(para) => <ShowUser lang={props.lang} loggedIn={props.loggedIn} username={props.username}
                                                   password={props.password} {...para} />}/>
                <Route path="/error/" render={(para) => <ErrorPage lang={props.lang} {...para} />}/>
            </Switch>
        </main>
    );
}

export default Main;