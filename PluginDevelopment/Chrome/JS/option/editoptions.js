document.addEventListener("DOMContentLoaded", function() {
  document.getElementById("showHidePassword").addEventListener("click", showHidePassword);
  document.getElementById("save").addEventListener("click", saveOptions);
  document.getElementById("savePassword").addEventListener("click", saveLoginData);

  var inputusername = document.getElementById("inputUserName");
  var inputpassword = document.getElementById("inputPassword");
  var inputpassword2 = document.getElementById("inputPasswordSec");
  var inputemail = document.getElementById("inputEmail");
  var error = document.getElementById("error");

  var ipAdress = "192.168.2.113";


  function showOptions() {
    chrome.storage.sync.get(["username", "password", "email"], function(result) {
      if (typeof result.username === "undefined")
        error.innerHTML += "Nickname existiert nicht!";
      else
        inputusername.value = result.username;

      if (typeof result.password === "undefined")
        error.innerHTML += "Passwort existiert nicht!";
      else {
        inputpassword.value = result.password;
        inputpassword2.value = result.password;
      }

      if (typeof result.email === "undefined")
        error.innerHTML += "Keine Email hinterlegt!";
      else
        inputemail.value = result.email;
    });
  }

  function saveOptions() {
    var username = inputusername.value;
    var password = inputpassword.value;
    var email = inputemail.value;
    if (inputpassword.value == inputpassword2.value && inputpassword.value != "" && inputusername.value != "") {
      chrome.sync.get(["save"], function(result) {
        if (save == true) {
          var xhr = new XMLHttpRequest();
          xhr.open("POST", "http://" + ipAdress + "/users/exist/", true);
          xhr.onload = function() {
            var data = JSON.parse(this.responseText);
            if (this.status === 200 && data.status == "username valid") {
              if (inputemail.value == "") {
                chrome.storage.sync.set({
                  username: username,
                  password: password
                });
                var xhr = new XMLHttpRequest();
                xhr.open("PATCH", "http://" + ipAdress + "/users/manage/", true);
                xhr.onload = function(){
                  if (this.status === 200)
                    alert("Ändern erfolgreich!");
                }
                xhr.send(JSON.stringify({
                  change: "name, password",
                  data: {
                    userName: username,
                    password: password
                  }
                }));
              } else {
                chrome.storage.sync.set({
                  username: username,
                  password: password,
                  email: email
                });

                var xhr = new XMLHttpRequest();
                xhr.open("PATCH", "http://" + ipAdress + "/users/manage/", true);
                xhr.onload = function(){
                  if(this.status === 200)
                    alert("Ändern erfolgreich!");
                }
                xhr.send(JSON.stringify({
                  change: "name", "password", "email"
                  data: {
                    userName: username,
                    password: password,
                    email: email
                  }
                }));
              }
            } else if (this.status === 200 && data.status == "username not valid")
              error.innerHTML = "Nutzername existiert bereits";
          }
        }
      });
    } else
      error.innerHTML += "Passwörter nicht gleich";
  }

  function showHidePassword() {
    if (inputpassword.type == "text") {
      inputpassword.type = "password";
      inputpassword2.type = "password";
    } else {
      inputpassword.type = "text";
      inputpassword2.type = "text";
    }
  }

  function saveLoginData() {
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

  showOptions();
});
