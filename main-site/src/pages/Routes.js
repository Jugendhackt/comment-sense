import React from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import { Home } from "./Home";
import { Account } from "./Account";
import { NotFound } from "./NotFound";
import { Container, makeStyles } from "@material-ui/core";


const useStyles = makeStyles(theme => ({
    mt: {
        marginTop: theme.spacing(2)
    }
}));

function Routes(props) {
    const classes = useStyles();

    return (
        <Container fixed className={classes.mt}>
            <Switch>
                <Route exact path="/" render={(para) => <Home {...para} />} />
                <Route exact path="/account" render={(para) => <Account {...para} />} />
                <Route exact path="/404" render={(para) => <NotFound {...para} />} />
                <Redirect to="/404" />
            </Switch>
        </Container>
    );
};

export { Routes as Pages };