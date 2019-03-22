document.addEventListener("DOMContentLoaded", function() {

  function getLoginData() {
    chrome.storage.sync.get(["save"], function(result) {
      if (result.save == true) {
        chrome.storage.sync.get(["username", "password"], function(result) {
          var xhr = new XMLHttpRequest();
          xhr.open("GET", "http://" + ipAdress + "/users/login/", true);
          xhr.onload = function() {
            if (this.status !== 200){
              window.location.href = "HTML/login.html";
            }
          }
          xhr.send(JSON.stringify({
            username: result.username,
            password: result.password
          }));
        });
      }
    });
  }

  getLoginData();
});
