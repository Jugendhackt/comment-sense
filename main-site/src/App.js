import React, {useContext} from 'react';
import {BrowserRouter as Router} from "react-router-dom";
import {ThemeProvider} from '@material-ui/core/styles';
import theme from "../src/ui/theme/";

import Navbar from "./components/Header/Navbar";
import {Pages} from "./pages/Routes";
import {CssBaseline} from '@material-ui/core';
import {getUsername, useLoggedIn, useSessionId} from './helpers';
import {observer} from 'mobx-react-lite';
import {UserStoreContext} from './stores/UserStore';


const App = observer((props) => {
    const userStore = useContext(UserStoreContext);
    const sessionId = useSessionId();

    useLoggedIn(sessionId).then(res => {
        if (res) {
            userStore.loggedIn = true;
            userStore.username = getUsername();
        }
    });

    return (
        <div>
            <ThemeProvider theme={theme}>
                <Router>
                    <CssBaseline/>
                    <Navbar/>
                    <Pages/>
                </Router>
            </ThemeProvider>
        </div>
    );
});

export default App;
