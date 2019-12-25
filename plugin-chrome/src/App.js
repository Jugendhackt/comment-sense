import React, {useContext} from 'react';
import {BrowserRouter as Router} from "react-router-dom";
import Navbar from "./components/Header/Navbar";
import Footer from "./components/Footer/Footer";
import Routes from "./pages/Routes";
import {ThemeProvider} from '@material-ui/styles';
import theme from "./ui/theme";
import {CssBaseline} from '@material-ui/core';
import {observer} from "mobx-react-lite";
import {UserStoreContext} from './stores/UserStore';
import {getStorage, useLoggedIn} from './helpers';

const App = observer((props) => {
    const userStore = useContext(UserStoreContext);
    const sessionId = getStorage("sid");
    console.log(sessionId);

    useLoggedIn(sessionId).then(res => {
        if (res) {
            userStore.loggedIn = true;
            userStore.username = getStorage("username");
        }
    });

    return (
        <>
            <ThemeProvider theme={theme}>
                <CssBaseline/>
                <Router>
                    <Navbar/>
                    <Routes/>
                    <Footer/>
                </Router>
            </ThemeProvider>
        </>
    );
});

export default App;
