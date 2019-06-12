document.addEventListener("DOMContentLoaded", function() {
  document.getElementById("login").addEventListener("click", createModalBoxLogin);
  document.getElementById("setting").addEventListener("click", createModalBox);

  const ipAdress = here;

  function setTopComments() {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "http://" + ipAdress + "/comments/top/", true);
    xhr.onload = function() {
      if (this.status === 200) {
        var data = JSON.parse(this.responseText);
        console.log(data);

        for (var i = 0; i < data.comments.length; i++) {
          document.getElementById("commentTitle" + i).textContent = data.comments[i].headline;
          document.getElementById("commentContent" + i).textContent = data.comments[i].content;
        }
      }
    }
    xhr.send();
  }

  setTopComments();

  function setTopWebsites() {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "http://" + ipAdress + "/sites/top/", true);
    xhr.onload = function() {
      if (this.status === 200) {
        var data = JSON.parse(this.responseText);
        console.log(data);
        for (var i = 0; i < 4; i++) {
          var title;
          if (data.sites[i].url.substring(0, 7) == "http://")
            title = data.sites[i].url.substring(7, data.sites[i].url.length);
          else if (data.sites[i].url.substring(0, 8) == "https://")
            title = data.sites[i].url.substring(8, data.sites[i].url.length);
          title = title.substring(0, title.length - 1);
          document.getElementById("websiteTitle" + i).textContent = title;
          document.getElementById("websiteVisitBtn" + i).addEventListener("click", function() {
            window.location.href = data.sites[this.id.substring(15, this.id.length)].url;
          });
        }
      }
    }
    xhr.send();
  }

  setTopWebsites();

  function createModalBox() {
    if (document.getElementById("modal") == null) {
      var design = localStorage.getItem("design");
      var modal = document.createElement("DIV");
      modal.id = "modal";

      if (design == null || design == "light")
        modal.style.backgroundColor = "lightgray";
      else if (design == "dark")
        modal.style.backgroundColor = "#292929";
      modal.classList.add("modal");

      var span = document.createElement("span");
      span.innerHTML = "&times";
      span.classList.add("closeSpan");
      modal.appendChild(span);

      var label = document.createElement("LABEL");
      label.classList.add("label");
      label.textContent = "Design auswählen";
      modal.appendChild(label);

      var comboBox = document.createElement("SELECT");
      comboBox.id = "design";
      comboBox.classList.add("select");
      comboBox.classList.add("modalSelect");

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
      button.classList.add("modalButton");
      modal.appendChild(button);

      var a = document.createElement("a");
      a.id = "linkToIcon";
      a.classList.add("a");
      a.textContent = "Links are from: https://www.iconfinder.com/Chanut-is";
      a.href = "https://www.iconfinder.com/Chanut-is";
      modal.appendChild(a);

      var username = localStorage.getItem("username");
      var password = localStorage.getItem("password");
      
      if (username != "null" && password != "null") {
        var button = document.createElement("button");
        button.id = "logout";
        button.classList.add("button");
        button.classList.add("modalButton");
        button.textContent = "Abmelden";
        button.addEventListener("click", function() {
          setLoginData(null, null);
          setErr("Du wurdest abgemeldet");
        });
        modal.appendChild(button);
      }

      var error = document.createElement("div");
      error.id = "error";
      error.classList.add("error");
      modal.appendChild(error);

      document.getElementById("nav").appendChild(modal);

      document.getElementById("save").addEventListener("click", function() {
        localStorage.setItem("design", document.getElementById("design").value);
        window.location.reload();
      });

      window.onclick = function(event) {
        if (event.target.id != "modal" && event.target.id != "save" && event.target.id != "setting" && event.target.id != "design" && event.target.id != "logout") {
          modal.remove();
        }
      }

      modal.style.display = "flex";
    }
  }

  function createElement(type, id, text, classList) {
    console.log(id);
    var element = document.createElement(type);
    if (id != "undefined" || id != null)
      element.id = id;
    if (type == "input")
      element.value = text;
    else
      element.innerHTML = text;
    element.classList.add(classList);
    return element;
  }

  function createModalBoxLogin() {
    console.log(document.getElementById("modal"));
    if (document.getElementById("modal") == null) {
      var design = localStorage.getItem("design");
      var modal = document.createElement("div");
      modal.id = "modal";

      if (design == null || design == "light")
        modal.style.backgroundColor = "lightgray";
      else if (design == "dark")
        modal.style.backgroundColor = "#292929";
      modal.classList.add("modal");

      var closeSpan = document.createElement("span");
      closeSpan.id = "closeSpan";
      closeSpan.innerHTML = "&times";
      closeSpan.classList.add("closeSpan");
      modal.appendChild(closeSpan);

      var label = document.createElement("label");
      label.textContent = "Nickname:";
      label.classList.add("label");
      label.classList.add("modalLabel");
      modal.appendChild(label);

      var input = createElement("input", "inputNickname", null, "input");
      input.id = "inputNickname";
      input.placeholder = "Dein Nickname";
      input.classList.add("input");
      input.classList.add("modalInput");
      modal.appendChild(input);

      var label = document.createElement("label");
      label.classList.add("label");
      label.classList.add("modalLabel");
      label.textContent = "Passwort:";
      modal.appendChild(label);

      var input = document.createElement("input");
      input.id = "inputPassword";
      input.type = "password";
      input.placeholder = "Dein Passwort";
      input.classList.add("input");
      input.classList.add("modalInput");
      modal.appendChild(input);

      var button = document.createElement("button");
      button.id = "loginModal";
      button.classList.add("button");
      button.classList.add("modalButton");
      button.textContent = "Anmelden";
      modal.appendChild(button);

      var button = document.createElement("button");
      button.id = "createAcc";
      button.classList.add("button");
      button.classList.add("modalButton");
      button.textContent = "Registrieren";
      modal.appendChild(button);

      var error = document.createElement("div");
      error.id = "error";
      error.classList.add("error");
      error.classList.add("modalError");
      modal.appendChild(error);

      document.getElementById("nav").appendChild(modal);
      document.getElementById("createAcc").addEventListener("click", function() {
        window.location.href = "HTML/signup.html";
      });
      document.getElementById("loginModal").addEventListener("click", login);

      window.onclick = function(event) {
        console.log(event.target);
        if (event.target.id != "modal" && event.target.id != "login" && event.target.id != "loginModal" && event.target.id != "inputNickname" && event.target.id != "inputPassword") {
          modal.remove();
        }
      }
      modal.style.display = "flex";
    }
  }

  function setLoginData(username, password) {
    localStorage.setItem("username", username);
    localStorage.setItem("password", password);
  }

  function login() {
    console.log("triggered");
    if (document.getElementById("inputNickname").value != "" || document.getElementById("inputPassword").value != "") {
      var xhr = new XMLHttpRequest();
      xhr.open("POST", "http://" + ipAdress + "/users/login/", true);
      xhr.onload = function() {
        if (this.status == 200) {
          setLoginData(document.getElementById("inputNickname").value, document.getElementById("inputPassword").value);
          setErr("Anmelden erfolgreich");
          setTimeout(function() {
            window.location.href = "HTML/showAcc.html"
          }, 1500);
        } else if (this.status == 404 || this.status == 422) {
          setLoginData("undefined", "undefined");
          setErr("Nutzer existiert nicht oder Passwort ist falsch");
        }
      }
      xhr.send(JSON.stringify({
        userName: document.getElementById("inputNickname").value,
        password: document.getElementById("inputPassword").value
      }));
    } else {
      setErr("Kein Nickname oder Passwort angegeben");
    }
  }

  function setErr(str) {
    if (str != document.getElementById("error").textContent)
      document.getElementById("error").textContent += str;
  }
});
