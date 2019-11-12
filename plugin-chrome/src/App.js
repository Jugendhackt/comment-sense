import React from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import { Header } from "./components/Header";
import { Routes } from "./pages/Routes";
import { ThemeProvider } from '@material-ui/styles';
import theme from "./ui/theme";
import { CssBaseline } from '@material-ui/core';

const App = () => {

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
};

export default App;
