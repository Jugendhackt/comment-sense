document.addEventListener("DOMContentLoaded", function() {
  const ipAdress = "192.168.2.108";
  document.getElementById("btnLogin").addEventListener("click", function() {
    if (this.textContent == "Anmelden") {
      if (document.getElementById("inputUsername").value == "" || document.getElementById("inputPassword").value == "")
        bootbox.alert("Es sind nicht alle Felder ausgefüllt!");
      else {
        var username = document.getElementById("inputUsername").value;
        var password = document.getElementById("inputPassword").value;
        var xhr = new XMLHttpRequest();
        xhr.open("POST", "http://" + ipAdress + "/users/login/", true);
        xhr.onload = function() {
          if (this.status === 200) {
            bootbox.alert("Du hast dich erfolgreich angemeldet!");
            chrome.storage.local.set({
              username: username,
              password: password
            });
          } else
            bootbox.alert(this.status.toString() + this.statusText.toString());
        }
        xhr.send(JSON.stringify({
          userName: username,
          password: password
        }));
      }
    }
  });
  document.getElementById("resetLogin").addEventListener("click", function() {
    chrome.storage.local.clear();
    document.getElementById("inputUsername").value = "";
    document.getElementById("inputPassword").value = "";
    bootbox.alert("Daten gelöscht", function() {
      window.location.reload();
    });
  });

  chrome.storage.local.get(["username", "password"], (result) => {
    if (typeof result.username != "undefined" && typeof result.password != "undefined") {
      var xhr = new XMLHttpRequest();
      xhr.open("POST", "http://" + ipAdress + "/users/login/", true);
      xhr.onload = function() {
        if (this.status === 200) {
          document.getElementById("hideAfterLogin").style.display = "none";
          document.getElementById("btnLogin").textContent = "Bereits angemeldet";
          bootbox.alert("Du bist bereits als " + result.username + " angemeldet!");
        } else
          bootbox.alert(this.status.toString() + this.statusText.toString());
      }
      xhr.send(JSON.stringify({
        userName: result.username,
        password: result.password
      }));
    }
  });
});
