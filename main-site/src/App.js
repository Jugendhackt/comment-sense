import React from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import { ThemeProvider } from '@material-ui/core/styles';
import theme from "../src/ui/theme/";

import { Header } from "./components/Header";
import { Pages } from "./pages/Routes";
import { CssBaseline } from '@material-ui/core';
import { useSessionId, useLoggedIn } from './helpers';


const App = (props) => {

  const sessionId = useSessionId();
  useLoggedIn(sessionId).then(res => console.log(res));

  return (
    <div>
      <ThemeProvider theme={theme}>
        <Router>
          <CssBaseline />
          <Header />
          <Pages />
        </Router>
      </ThemeProvider>
    </div>
  );
};

export default App;
