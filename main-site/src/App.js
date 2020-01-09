import React from 'react';
import {BrowserRouter as Router} from "react-router-dom";
import {ThemeProvider} from '@material-ui/core/styles';
import {useGetStorage, useLoggedIn, useStores} from "package/util/hooks";
import {Header} from "package/components";
import {theme} from "package/theme";
import {Routes} from "./pages/Routes";
import {CssBaseline} from '@material-ui/core';
import {observer} from 'mobx-react-lite';

const App = observer(() => {
    const {userStore} = useStores();
    const sessionId = useGetStorage("sid");

    useLoggedIn(sessionId).then(res => {
        if (res) {
            userStore.loggedIn = true;
            userStore.username = useGetStorage("username");
        }
    });

    return (
        <div>
            <ThemeProvider theme={theme}>
                <Router>
                    <CssBaseline/>
                    <Header/>
                    <Routes/>
                </Router>
            </ThemeProvider>
        </div>
    );
});

export default App;
