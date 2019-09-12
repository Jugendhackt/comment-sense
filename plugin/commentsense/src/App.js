/*global chrome*/
import React, { useState, useEffect } from 'react';
import { withRouter } from "react-router-dom";

import Header from "./components/Header/Header";
import Main from "./components/Main/Main";
import Footer from "./components/Footer/Footer";

import ipAdress from "./ipAdress";
import langde from "./lang/lang.de";

function App(props) {
  const [lang, setLang] = useState(navigator.language);
  const [username, setUsername] = useState(undefined);
  const [password, setPassword] = useState(undefined);
  const [loggedIn, setLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    chrome.storage.local.get(["username", "password"], result => {
      if (typeof result.username != "undefined" && typeof result.password != "undefined") {
        fetch(`${ipAdress}/users/login/`, {
          method: "POST",
          body: JSON.stringify({
            userName: result.username,
            password: result.password
          })
        })
          .then(res => res.json())
          .then(res => {
            console.log("hi2");
            if (res.status === "login data valid") {
              setUsername(result.username);
              setPassword(result.password);
              setLoggedIn(true);
              setLoading(false);
            } else {
              setLoading(false);
              setLoggedIn(false);
            }
          })
          .catch(e => {
            props.history.push("/error/");
          })
      } else {
        setLoggedIn(false);
        setLoading(false);
      }
    });
  }, []);

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
  if (loading === false) {
    return (
      <>
        <Header lang={getLanguage()} />
        <Main lang={getLanguage()} loggedIn={loggedIn} username={username} password={password} />
        <Footer lang={getLanguage()} loggedIn={loggedIn} />
      </>
    );
  } else {
    return (
      <>
        <div className="spinner-border" role="status">
          <span className="sr-only">loading</span>
        </div>
      </>
    )
  }

}

export default withRouter(App);
