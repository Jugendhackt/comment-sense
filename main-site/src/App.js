import React from 'react';
import {BrowserRouter as Router} from "react-router-dom";
import {ThemeProvider} from '@material-ui/core/styles';
import theme from "./theme";
import {Header, getStorage, useLoggedIn, useStores} from "package";
import {Pages} from "./pages/Routes";
import {CssBaseline} from '@material-ui/core';
import {observer} from 'mobx-react-lite';

const App = observer((props) => {
    const {userStore} = useStores();
    const sessionId = getStorage("sid");

    useLoggedIn(sessionId).then(res => {
        if (res) {
            userStore.loggedIn = true;
            userStore.username = getStorage("username");
        }
    });

    return (
        <div>
            <ThemeProvider theme={theme}>
                <Router>
                    <CssBaseline/>
                    <Header/>
                    <Pages/>
                </Router>
            </ThemeProvider>
        </div>
    );
});

export default App;
