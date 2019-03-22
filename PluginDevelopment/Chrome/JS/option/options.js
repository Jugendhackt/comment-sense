document.addEventListener("DOMContentLoaded", function() {
  document.getElementById("btnLogin").addEventListener("click", checkData);
  document.getElementById("btnSavePassword").addEventListener("click", save);

  const ipAdress = "192.168.2.113";
  const error = document.getElementById("error");
  const inputUsername = document.getElementById("inputUsername");
  const inputPassword = document.getElementById("inputPassword");

  function checkData() {
    var username = inputUsername.value;
    var password = inputPassword.value;
    if (username == "" || password == "")
      error.innerHTML = "Es sind nicht alle Felder ausgefüllt!";
    else {
      chrome.storage.sync.get(["username", "password"], function(result) {
        if (typeof result.username === "undefined" || result.username == "") {
          chrome.storage.sync.set({
            username: username,
            password: password,
            save: false
          });
        }
        var xhr = new XMLHttpRequest();
        xhr.open("POST", "http://" + ipAdress + "/users/login/", true);
        xhr.onload = function() {
          var data = JSON.parse(this.responseText);
          if (this.status === 200 && data.status == "login data valid") {
            saveLoginData();
            window.open("HTML/showoptions.html", "_blank");
          } else if (this.status === 401 && data.status == "login data not valid")
            error.innerHTML = "Passwort oder Nutzername ist nicht korrekt";
        }
        xhr.send(JSON.stringify({
          userName: username,
          password: password
        }));
      });
    }
  }

  function save() {
    chrome.storage.sync.get(["save"], function(result) {
      if (result.save == true) {
        chrome.storage.sync.set({
          save: false
        });
        error.innerHTML = "Passwort wird nicht gespeichert";
      } else {
        chrome.storage.sync.set({
          save: true
        });
        error.innerHTML = "Passwort wird gespeichert";
      }
    });
  }

  function saveLoginData() {
    chrome.storage.sync.get(["save"], function(result) {
      var username = inputUsername.value;
      var password = inputPassword.value;
      if (result.save == true) {
        chrome.storage.sync.set({
          username: username,
          password: password
        });
      }
    });
  }

  function readLoginData() {
    chrome.storage.sync.get(["username", "password", "save"], function(result){
      if (result.save == true){
        var xhr = new XMLHttpRequest();
        xhr.open("POST", "http://" + ipAdress + "/users/login/", true);
        xhr.onload = function() {
          var data = JSON.parse(this.responseText);
          if (this.status === 200 && data.status == "login data valid") {
            inputUsername.value = result.username;
            inputPassword.value = result.password
          } else {
            inputUsername.value = "";
            inputPassword.value = "";
          }
        }
        xhr.send(JSON.stringify({
          userName: result.username,
          password: result.password
        }));
      }
    });
  }
  readLoginData();
});
