import React, { useContext } from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import { Header } from "./components/Header";
import { Routes } from "./pages/Routes";
import { ThemeProvider } from '@material-ui/styles';
import theme from "./ui/theme";
import { CssBaseline } from '@material-ui/core';
import { observer } from "mobx-react-lite";
import { UserStoreContext } from './stores/UserStore';
import { useSessionId, useLoggedIn, getUsername } from './helpers';

const App = observer((props) => {
  const userStore = useContext(UserStoreContext);
  const sessionId = useSessionId();

  useLoggedIn(sessionId).then(res => {
    if (res) {
      userStore.loggedIn = true;
    }
  });

  console.log(localStorage.getItem("sid"));

  return (
    <div>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <Header />
          <Routes />
        </Router>
      </ThemeProvider>
    </div>
  );
});

export default App;
