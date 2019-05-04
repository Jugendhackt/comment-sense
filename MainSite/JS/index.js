document.addEventListener("DOMContentLoaded", function() {
  document.getElementById("createAcc").addEventListener("click", function() {
    window.location.href = "signup.html";
  });
  document.getElementById("setting").addEventListener("click", function() {
    createModalBox();
  });

  const ipAdress = "192.168.2.110";

  function setTopComments() {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "http://" + ipAdress + "/comments/top/", true);
    xhr.onload = function() {
      console.log(this.responseText);
      if (this.status === 200) {
        var data = JSON.parse(this.responseText);

        for (var i = 0; i < 4; i++) {
          document.getElementById("link" + i).href = data[i];
        }
      }
    }
    xhr.send();
  }

  function setTopWebsites() {
    var data = JSON.parse(getXhrData("/sites/top/", true));
  }

  function createModalBox() {
    if (document.getElementById("modal") == null) {
      var design = localStorage.getItem("design");
      var modal = document.createElement("DIV");
      modal.id = "modal";

      if (design == null || design == "light")
        modal.style.backgroundColor = "lightgray";
      else if (design == "dark")
        modal.style.backgroundColor = "black";
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
      document.body.appendChild(modal);
      document.getElementById("save").addEventListener("click", function() {
        localStorage.setItem("design", document.getElementById("design").value);
        window.location.reload();
      });

      window.onclick = function(event) {
        if (event.target == modal) {
          modal.remove();
        }
      }

      modal.style.display = "flex";
    }
  }
  //setTopComments();
});
