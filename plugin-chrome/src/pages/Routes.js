import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { Container } from "@material-ui/core";
import { Home } from "./Home";
import { NotFound } from "./NotFound";

const Routes = (props) => {
    return (
        <Container fixed>
            <Switch>
                <Route exact path="/index.html" render={(para) => <Home {...para} />} />
                <Route exact path="/404/" render={(para) => <NotFound {...para} />} />
                <Redirect to="/404/" />
            </Switch>
        </Container>
    );
};

export { Routes };