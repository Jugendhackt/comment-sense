document.addEventListener("DOMContentLoaded", function() {
  if (window.location.href.split("/").pop() == "login.html")
    document.getElementById("btnLogin").addEventListener("click", login);
  const ipAdress = "192.168.2.113";

  const inputUsername = document.getElementById("inputUsername");
  const inputPassword = document.getElementById("inputPassword");


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

  function login() {
    var username = inputUsername.value;
    var password = inputPassword.value;

    var xhr = new XMLHttpRequest();
    xhr.open("POST", "http://" + ipAdress + "/users/login/", true);
    xhr.onload = function() {
      var data = JSON.parse(this.responseText);
      if (this.status === 200 && data.status == "login data valid")
    }
  }

  function readLoginData() {
    chrome.storage.sync.get(["username", "password", "save"], function(result) {
      if (result.save == true) {
        var xhr = new XMLHttpRequest();
        xhr.open("POST", "http://" + ipAdress + "/users/login/", true);
        xhr.onload = function() {
          var data = JSON.parse(this.responseText);
          if (this.status !== 200 || data.status != "login not data valid") {
            window.location.href = "HTML/login.html";
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
