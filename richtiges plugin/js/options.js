document.addEventListener("DOMContentLoaded", function() {
  const ipAdress = "192.168.2.110";
  document.getElementById("btnLogin").addEventListener("click", function() {
    var username = document.getElementById("inputUsername").value;
    var password = document.getElementById("inputPassword").value;
    console.log(username);
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "http://" + ipAdress + "/users/login/", true);
    xhr.onload = function() {
      if (this.status === 200) {
        bootbox.alert("yeah");
        chrome.storage.local.set({username: username, password: password});
      }
    }
    xhr.send(JSON.stringify({
      userName: username,
      password: password
    }));
  });

  chrome.storage.local.get(["username", "password"], (result) => {
    if (typeof result.username != "undefined" && typeof result.password != "undefined") {
      document.getElementById("inputUsername").value = result.username;
      document.getElementById("inputPassword").value = result.password;
    }
  });
});
