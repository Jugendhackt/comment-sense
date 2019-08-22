import React from "react";
import {Route} from "react-router-dom";

import ShowUser from "./ShowUser";

function Main(props) {
    return (
        <main>
            <Route exact path="/"></Route>
            <Route exact path="/user/" render={(para) => <ShowUser lang={props.lang} ipAdress={props.ipAdress} {...para}/>} ></Route>
        </main>
    );
}

export default Main;