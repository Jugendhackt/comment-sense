import React from "react";
import {Redirect, Route, Switch} from "react-router-dom";
import {Container} from "@material-ui/core";
import Home from "./Home";
import {NotFound} from "package/pages";

const Routes = () => {
    return (
        <div className="scrollbar">
            <Container fixed>
                <Switch>
                    <Route exact path="/index.html" render={(para) => <Home {...para} />}/>
                    <Route exact path="/404/" render={(para) => <NotFound {...para} />}/>
                    <Redirect to="/404/"/>
                </Switch>
            </Container>
        </div>
    );
};

export default Routes;