document.addEventListener("DOMContentLoaded", function() {
  document.getElementById("labelPassword").addEventListener("mouseover", function() {
    document.getElementById("inputPassword").type = "text";
  });
  document.getElementById("labelPassword").addEventListener("mouseout", function() {
    document.getElementById("inputPassword").type = "password";
  });
  document.getElementById("editAcc").addEventListener("click", function() {
    editData();
    sendData();
  });

  const ipAdress = here;

  function setData() {
    document.getElementById("inputNickname").value = localStorage.getItem("username");
    document.getElementById("inputPassword").value = localStorage.getItem("password");

    if (localStorage.getItem("email") != null)
      document.getElementById("inputEmail").value = localStorage.getItem("email");
    else
      document.getElementById("inputEmail").placeholder = "Noch nicht angegeben";
  }

  function editData() {
    if (document.getElementById("editAcc").textContent == "Ändern") {
      document.getElementById("editAcc").textContent = "Speichern";
      document.getElementById("inputNickname").readOnly = false;
      document.getElementById("inputPassword").readOnly = false;
      document.getElementById("inputEmail").readOnly = false;
    } else if (document.getElementById("editAcc").textContent == "Speichern") {
      document.getElementById("editAcc").textContent = "Ändern";
      document.getElementById("inputNickname").readOnly = true;
      document.getElementById("inputPassword").readOnly = true;
      document.getElementById("inputEmail").readOnly = true;
    }
  }

  function sendData() {
    if (document.getElementById("editAcc").textContent == "Speichern") {
      var username = document.getElementById("inputNickname").value;
      var password = document.getElementById("inputPassword").value;
      var email = document.getElementById("inputEmail").value;

      if (!validateEmail(email))
        email = "";

      if (username != "" && password != "") {
        var xhr = new XMLHttpRequest("PATCH", "http://" + ipAdress + "/users/manage/", true);
        xhr.onload = function() {
          if (this.status == 200) {
            setErr("Erfolgreich geändert");
          }
        }
        xhr.send(JSON.stringify({
          userName: username,
          password: password,
          email: email
        }));
      }
    }
  }

  function setErr(str) {
    if (document.getElementById("error").textContent != str)
      document.getElementById("error").textContent += str;
  }

  function validateEmail(email) {
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
  }

  setData();
});
