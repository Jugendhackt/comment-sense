import React from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import { ThemeProvider } from '@material-ui/core/styles';
import theme from "../src/ui/theme/index";

import { Header } from "./components/Header/index";
import { Pages } from "./pages/Routes";
import { CssBaseline } from '@material-ui/core';


function App() {

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
}

export default App;
