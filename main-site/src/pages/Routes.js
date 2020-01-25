import React from "react";
import {Redirect, Route, Switch} from "react-router-dom";
import {Home} from "./Home";
import {Account} from "./Account";
import {NotFound} from "package/pages";
import {Container, makeStyles} from "@material-ui/core";

const useStyles = makeStyles(theme => ({
    mt: {
        marginTop: theme.spacing(2)
    }
}));

export const Routes = () => {
    const classes = useStyles();

    return (
        <Container fixed className={classes.mt}>
            <Switch>
                <Route exact path="/">
                    <Home/>
                </Route>
                <Route exact path="/account">
                    <Account/>
                </Route>
                <Route exact path="/404">
                    <NotFound/>
                </Route>
                <Redirect to="/404"/>
            </Switch>
        </Container>
    );
};