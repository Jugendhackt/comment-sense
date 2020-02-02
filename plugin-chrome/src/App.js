import React from 'react';
import {BrowserRouter as Router} from "react-router-dom";
import {Header, Snackbars} from "package/components";
import {theme} from "package/theme";
import {useGetStorage, useLoggedIn, useStores} from "package/util/hooks";
import {Footer} from "./components/Footer";
import Routes from "./pages/Routes";
import {ThemeProvider} from '@material-ui/styles';
import {CssBaseline} from '@material-ui/core';
import {observer} from "mobx-react-lite";

export const App = observer(() => {
    const {userStore} = useStores();
    const sid = useGetStorage("sid");

    useLoggedIn(sid).then(res => {
        if (res) {
            userStore.signIn({username: useGetStorage("username"), sid: sid});
        }
    });
    console.log("rerender");

    return (
        <>
            <ThemeProvider theme={theme}>
                <CssBaseline/>
                <Router>
                    <Header/>
                    <Routes/>
                    <Footer/>
                    <Snackbars/>
                </Router>
            </ThemeProvider>
        </>
    );
});
