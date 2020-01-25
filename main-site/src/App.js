import React from 'react';
import {BrowserRouter as Router} from "react-router-dom";
import {useEmail, useGetStorage, useLoggedIn, useStores} from "package/util/hooks";
import {Header, Snackbars} from "package/components";
import {theme} from "package/theme";
import {Routes} from "./pages/Routes";
import {CssBaseline, ThemeProvider} from '@material-ui/core';
import {observer} from 'mobx-react-lite';

export const App = observer(() => {
    const {userStore} = useStores();
    const sid = useGetStorage("sid");
    console.log("render");

    useLoggedIn(sid).then(res => {
        if (res) {
            userStore.signIn({sid: sid, username: useGetStorage("username")});
            useEmail(sid)
                .then(email => {
                    if (email) {
                        userStore.email = email;
                    }
                });
        }
    });

    return (
        <>
            <ThemeProvider theme={theme}>
                <Router>
                    <CssBaseline/>
                    <Header/>
                    <Routes/>
                    <Snackbars/>
                </Router>
            </ThemeProvider>
        </>
    );
});
