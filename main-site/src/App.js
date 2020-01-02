import React, {useContext} from 'react';
import {BrowserRouter as Router} from "react-router-dom";
import {ThemeProvider} from '@material-ui/core/styles';
import theme from "./theme/";
import Navbar from "./components/Header/Navbar";
import {Pages} from "./pages/Routes";
import {CssBaseline} from '@material-ui/core';
import {getStorage} from './util/helpers';
import {observer} from 'mobx-react-lite';
import {useLoggedIn, useSessionId} from "./util/hooks";
import {useStores} from "./util/hooks";


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
                    <Navbar/>
                    <Pages/>
                </Router>
            </ThemeProvider>
        </div>
    );
});

export default App;
