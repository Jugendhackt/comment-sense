import React from "react";
import { Route } from "react-router-dom";
import { Home } from "./Home";
import { Container } from "@material-ui/core";

function Routes(props) {
    return (
        <Container fixed>
            <Route exact path="/" render={(para) => <Home {...para} />} />
        </Container>
    );
};

export { Routes as Pages };