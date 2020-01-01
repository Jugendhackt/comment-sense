import React, {useState} from 'react';
import {BrowserRouter as Router} from "react-router-dom";
import {Header} from "./components/Header";
import {getStorage} from "./util/helpers";
import {Footer} from "./components/Footer";
import Routes from "./pages/Routes";
import {ThemeProvider} from '@material-ui/styles';
import theme from "./theme";
import {CircularProgress, CssBaseline, makeStyles} from '@material-ui/core';
import {observer} from "mobx-react-lite";
import {useStores, useLoggedIn} from "./util/hooks";

const App = observer(() => {
    const [loading, setLoading] = useState(true);
    const {userStore} = useStores();
    const sessionId = getStorage("sid");

    useLoggedIn(sessionId).then(res => {
        if (res) {
            userStore.loggedIn = true;
            userStore.handleUsername(getStorage("username"));
            userStore.handleSid(sessionId);
            setLoading(false);
        } else {
            setLoading(false);
        }
    });

    if (!loading) {
        return (
            <>
                <ThemeProvider theme={theme}>
                    <CssBaseline/>
                    <Router>
                        <Header/>
                        <Routes/>
                        <Footer/>
                    </Router>
                </ThemeProvider>
            </>
        );
    } else {
        return (
            <ThemeProvider theme={theme}>
                <CssBaseline/>
                <CircularProgress size={100}/>
            </ThemeProvider>
        );
    }
});

export default App;
