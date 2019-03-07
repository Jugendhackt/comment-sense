document.addEventListener("DOMContentLoaded", function() {
  document.getElementById("button-save").addEventListener("click", sendsaveData);
  document.getElementById("button-savePassword").addEventListener("click", SavePasswordfnc);

  const ipAdress = '192.168.56.1'
  var SavePassword = false;

  chrome.storage.sync.get(["SavePassword"], function(result) {
    if (typeof result.PasswordState === "undefined") {
      chrome.storage.sync.set({
        SavePassword: SavePassword
      });
    } else {
      SavePassword = result.SavePassword;
    }
  });

  //checkPasswordvalue();

  const error = document.getElementById("error");
  const inputUsername = document.getElementById("inputUsername");
  const inputPassword = document.getElementById("inputPassword");
  const savePassword = document.getElementById("button-savePassword");

  function sendsaveData() {
    var username = inputUsername.value;
    var password = inputPassword.value;
    if (username == "" || password == "") {
      error.innerHTML = "Es sind nicht alle Felder ausgefüllt!";
    } else {
      //get Username or set it for the first time
      chrome.storage.sync.get(["username"], function(result) {
        if (typeof result.username === "undefined" || result.username == "")
          chrome.storage.sync.set({
            username: username
          });
      });
      //get password or set it for the first time
      chrome.storage.sync.get(["password"], function(result) {
        if (typeof result.password === "undefined" || result.password == "")
          chrome.storage.sync.set({
            password: password
          });
      });

      var xhr = new XMLHttpRequest();
      xhr.onload = function() {
        if (this.responseText == "") {
          //do something
        }
      }
      xhr.open("POST", ipAdress, true);
      xhr.send(JSON.stringify({
        username: username.toString(),
        password: password.toString()
      }));
    }
  }

  function SavePasswordfnc() {
    if (SavePassword == false) {
      error.innerHTML = "Passwort wird gespeichert!";
      SavePassword = true;
      chrome.storage.sync.set({
        SavePassword: SavePassword
      });
    } else {
      error.innerHTML = "";
      SavePassword = false;
      chrome.storage.sync.set({
        SavePassword: SavePassword
      });
    }
  }

  function GetData() {
    var xhr = new XMLHttpRequest();
    var response = "";
    xhr.onload() = function() {
      if(this.status === 200){
        console.log(this.responseText);
        response = JSON.pars(this.responseText);
      } else {
        alert(this.status);
      }
    }
    xhr.open("GET", ipAdress, true);
    xhr.send(JSON.stringify({
      username: username,
      password: password
    }));
    JSON.parse(response);
    if (response.username == chrome.storage.sync.get(["username"]) && response.password == chrome.storage.sync.get(["password"]) && chrome.storage.sync.get(["SavePassword"]) == true){
      return true;
    }
  }

  function checkPasswordvalue() {
    var password = "", username = "";
    if(GetData() == true){
      chrome.tabs.query({
        title: "Erweiterte Optionen"
      }, function(tabs) {
        if (tabs.length < 1) {
          window.location.href = "./HTML/showoptions.html";
        }
      });
    }
  }

});
