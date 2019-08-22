import React, { useState } from 'react';
import { BrowserRouter as Router } from "react-router-dom";

import Header from "./components/Header/HeaderMain";
import Main from "./components/Main/Main";

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


  return (
    <>
      <Router>
        <Header lang={getLanguage()} ipAdress={ipAdress}/>
        <Main lang={getLanguage()} ipAdress={ipAdress}/>
      </Router>
    </>
  );
}

export default App;
