import React from 'react';
import {BrowserRouter as Router} from "react-router-dom";
import {useEmail, useLoggedIn, useStorage, useStores, useTopComments, useTopWebsites} from "package/util/hooks";
import {Dialogs, Header, Snackbars} from "package/components";
import {theme} from "package/theme";
import {Routes} from "./pages/Routes";
import {CssBaseline, ThemeProvider} from '@material-ui/core';
import {observer} from 'mobx-react-lite';

const request = async () => {
    const {userStore, commentStore, websiteStore} = useStores();
    const sid = useStorage.get("sid");
    const username = useStorage.get("username");

    const loggedIn = await useLoggedIn(sid);
    if (loggedIn) {
        userStore.signIn(sid, username);
        userStore.email = await useEmail(sid);
        commentStore.comments = await useTopComments(5, userStore.username);
    } else {
        commentStore.comments = await useTopComments(5);
    }
    websiteStore.websites = await useTopWebsites(5);
};

export const App = observer( () => {
    request();

    return (
        <>
            <ThemeProvider theme={theme}>
                <Router>
                    <CssBaseline/>
                    <Header/>
                    <Routes/>
                    <Dialogs/>
                    <Snackbars/>
                </Router>
            </ThemeProvider>
        </>
    );
});
