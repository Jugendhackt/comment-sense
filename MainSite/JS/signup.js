document.addEventListener("DOMContentLoaded", function() {
  document.getElementById("button-save").addEventListener("click", sendsaveData);
  document.getElementById("setting").addEventListener("click", createModalBox);
  document.getElementById("labelPassword").addEventListener("mouseover", function(){
    document.getElementById("inputPassword").type = "text";
  });
  document.getElementById("labelPassword").addEventListener("mouseout", function(){
    document.getElementById("inputPassword").type = "password";
  });

  const ipAdress = '192.168.5.163'

  function sendsaveData() {
    if (document.getElementById("inputUsername").value == "" || document.getElementById("inputPassword").value == "") {
      document.getElementById("error").innerHTML = "Es sind nicht alle Felder ausgefüllt!";
    } else {
      document.getElementById("error").innerHTML = "";
      var email;

      if (validateEmail(document.getElementById("inputEmail").value) || document.getElementById("inputEmail").value == "") {
        var xhr = new XMLHttpRequest();
        xhr.open("POST", "http://" + ipAdress + "/users/create/", true);
        xhr.onload = function() {
          if (this.status === 200) {
            var data = JSON.parse(this.responseText);
            console.log("hi");
          }
        }
        xhr.send(JSON.stringify({
          userName: document.getElementById("inputUsername").value,
          password: document.getElementById("inputPassword").value,
          email: ""
        }));
      } else
        document.getElementById("error").textContent += "E-Mail nicht gültig";
    }
  }

  function validateEmail(email) {
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
  }

  function createModalBox() {
    console.log("triggered");
    if (document.getElementById("modal") == null) {
      var design = localStorage.getItem("design");
      var modal = document.createElement("DIV");
      modal.id = "modal";

      if (design == null || design == "light")
        modal.style.backgroundColor = "lightgray";
      else if (design == "dark")
        modal.style.backgroundColor = "#292929";
      modal.classList.add("modal");
      modal.style.height = "500px";
      modal.style.width = "100vw";

      var label = document.createElement("LABEL");
      label.classList.add("label");
      label.textContent = "Design auswählen";
      modal.appendChild(label);

      var comboBox = document.createElement("SELECT");
      comboBox.id = "design";
      comboBox.classList.add("select");

      var light = document.createElement("OPTION");
      light.appendChild(document.createTextNode("hell"));
      light.value = "light";
      light.classList.add("option");
      comboBox.appendChild(light);

      var dark = document.createElement("OPTION");
      dark.appendChild(document.createTextNode("dunkel"));
      dark.value = "dark";
      dark.classList.add("option");
      comboBox.appendChild(dark);

      modal.appendChild(comboBox);

      if (design == null || design == "light")
        comboBox.selectedIndex = 0;
      else
        comboBox.selectedIndex = 1;

      var button = document.createElement("BUTTON");
      button.id = "save";
      button.textContent = "Speichern";
      button.classList.add("button");
      modal.appendChild(button);

      var a = document.createElement("a");
      a.id = "linkToIcon";
      a.classList.add("a");
      a.textContent = "Links are from: https://www.iconfinder.com/Chanut-is";
      a.href = "https://www.iconfinder.com/Chanut-is";
      modal.appendChild(a);

      document.body.appendChild(modal);
      document.getElementById("save").addEventListener("click", function() {
        localStorage.setItem("design", document.getElementById("design").value);
        window.location.reload();
      });

      window.onclick = function(event) {
        if (event.target.id != "save" && event.target.id != "setting" && event.target.id != "design") {
          modal.remove();
        }
      }

      modal.style.display = "flex";
    }
  }
});
