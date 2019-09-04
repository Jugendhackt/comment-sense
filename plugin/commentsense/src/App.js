import React, { useState } from 'react';
import { BrowserRouter as Router } from "react-router-dom";

import Header from "./components/Header/Header";
import Main from "./components/Main/Main";
import Footer from "./components/Footer/Footer";

import ipAdress from "./ipAdress";

import langde from "./lang/lang.de";

function App() {
  const [lang, setLang] = useState(navigator.language);

  function getLanguage() {
    switch (lang) {
      case "de-DE":
      case "DE-de":
      case "de":
        return langde;

      default:
        return langde;
    }
  }

  console.log(window.location.pathname);

  return (
    <>
      <Router>
        <Header lang={getLanguage()} ipAdress={ipAdress}/>
        <Main lang={getLanguage()} ipAdress={ipAdress}/>
        <Footer lang={getLanguage()} ipAdress={ipAdress} />
      </Router>
    </>
  );
}

export default App;
