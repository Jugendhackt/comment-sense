document.addEventListener("DOMContentLoaded", function() {
  const ipAdress = "192.168.2.110";

  document.getElementById("hide").style.display = "none";
  document.getElementById("btnChangeData").addEventListener("click", function() {
    if (document.getElementById("btnChangeData").textContent == "Daten ändern") {
      hide(false);
    } else if (document.getElementById("btnChangeData").textContent == "Speichern") {
      hide(true);
      var xhr = new XMLHttpRequest();
      xhr.open("POST", "http://" + ipAdress + "/users/", true);
      xhr.onload = function() {
        if (this.status === 200) {
          
        }
      }
      xhr.send();
    }
  });
  document.getElementById("btnDeleteAccount").addEventListener("click", function() {
    var username = localStorage.getItem("username");
    var password = localStorage.getItem("password");
    bootbox.dialog({
      title: "Account löschen?",
      message: "Wollen Sie wirklich ihren Account löschen?<br>Dieser Schritt kann nicht rückgängig gemacht werden.",
      buttons: {
        cancel: {
          label: "Abbrechen",
        },
        confirm: {
          label: "Ja, ich möchte meinen Account löschen.",
          className: "btn-danger",
          callback: function() {
            var xhr = new XMLHttpRequest();
            xhr.open("DELETE", "http://" + ipAdress + "/users/delete/", true);
            xhr.onload = function() {
              if (this.status === 200) {

              }
            }
            xhr.send(JSON.stringify({
              userName: username,
              password: password
            }));
          }
        }
      }
    });
  });

  function setUserData() {
    var username = localStorage.getItem("username");
    var password = localStorage.getItem("password");
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "http://" + ipAdress + "/users/get/", true);
    xhr.onload = function() {
      if (this.status === 200) {
        var data = JSON.parse(this.responseText);
        console.log(this.responseText);
        document.getElementById("inputUsername").value = data.userName;
        document.getElementById("inputPassword").value = data.password;
        document.getElementById("inputEmail").value = data.email;
      }
    }
    xhr.send(JSON.stringify({
      userName: username,
      password: password
    }));
  }

  function hide(bool) {
    if (bool == true) {
      document.getElementById("inputUsername").readOnly = true;
      document.getElementById("inputPassword").readOnly = true;
      document.getElementById("inputEmail").readOnly = true;
      document.getElementById("hide").style.display = "none";
      document.getElementById("btnChangeData").textContent = "Daten ändern";
    } else if (bool == false) {
      document.getElementById("inputUsername").readOnly = false;
      document.getElementById("inputPassword").readOnly = false;
      document.getElementById("inputEmail").readOnly = false;
      document.getElementById("hide").style.display = "block";
      document.getElementById("btnChangeData").textContent = "Speichern";
    }
  }

  setUserData();
});
