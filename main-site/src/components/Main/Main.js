import React from "react";
import {Route, Switch} from "react-router-dom";

import TopWebsites from "./TopWebsites/TopWebsites";

function Main(props) {
    return (
        <main className="container">
            <Switch>
                <Route exact path="/" render={para => <TopWebsites lang={props.lang} {...para} />}/>
            </Switch>
        </main>
    );
}

export default Main;