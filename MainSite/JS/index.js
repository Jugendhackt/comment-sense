document.addEventListener("DOMContentLoaded", function() {
  document.getElementById("btnLogin").addEventListener("click", showLoginModalBox);
  document.getElementById("settingIcon").addEventListener("click", showSettingsModalBox);
  document.getElementById("linkToGithub").addEventListener("click", function() {
    window.location.href = "http://www.github.com/Jugendhackt/comment-sense";
  });

  const ipAdress = "192.168.2.110";

  function setTopComments() {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "http://" + ipAdress + "/comments/top/", true);
    xhr.onload = function() {
      if (this.status === 200) {
        var data = JSON.parse(this.responseText);
        for (var i = 0; i < data.comments.length; i++) {
          var commentDiv = document.createElement("div");
          commentDiv.id = "comment" + i;
          commentDiv.classList.add("commentDiv");

          var title = document.createElement("div");
          title.id = "commentTitle" + i;
          title.classList.add("bold");
          title.textContent = data.comments[i].headline;
          commentDiv.appendChild(title);

          var content = document.createElement("div");
          content.id = "commentContent" + i;
          content.classList.add("commentContent");
          content.textContent = data.comments[i].content;
          commentDiv.appendChild(content);

          var btnDiv = document.createElement("div");
          btnDiv.classList.add("btnDiv");
          commentDiv.appendChild(btnDiv);

          var visit = document.createElement("button");
          visit.id = "btnVisitComment" + i;
          visit.classList.add("btn");
          visit.classList.add("visitComment");
          visit.textContent = "Zum Kommentar wechseln";
          btnDiv.appendChild(visit);

          document.getElementById("topComments").appendChild(commentDiv);
        }

      }
    }
    xhr.send();
  }

  function setTopWebsites() {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "http://" + ipAdress + "/sites/top/", true);
    xhr.onload = function() {
      if (this.status === 200) {
        var data = JSON.parse(this.responseText);
        console.log(data.sites[1]);

        for (var i = 0; i < data.sites.length; i++) {
          var websiteDiv = document.createElement("div");
          websiteDiv.id = "websiteDiv" + i;
          websiteDiv.classList.add("websiteDiv");

          var title = document.createElement("div");
          title.id = "websiteTitle" + i;
          title.classList.add("bold");
          var headline = data.sites[i].url;
          if (headline.length > 25)
            headline = headline.substring(0, 20) + "...";
          title.textContent = headline;
          websiteDiv.appendChild(title);

          var btnDiv = document.createElement("div");
          btnDiv.classList.add("btnDiv");
          websiteDiv.appendChild(btnDiv);

          var visit = document.createElement("button");
          visit.id = "visitWebsite" + i;
          visit.classList.add("btn");
          visit.classList.add("visitWebsite");
          visit.textContent = "Zur Website wechseln";
          btnDiv.appendChild(visit);

          visit.addEventListener("click", function() {
            window.location.href = data.sites[this.id.substring(12, this.id.length)].url;
          });

          document.getElementById("topWebsites").appendChild(websiteDiv);
        }
      }
    }
    xhr.send();
  }

  function showLoginModalBox() {
    if (document.getElementsByClassName("modal").length == 0) {
      var modal = document.createElement("div");
      modal.id = "modalLogin";
      modal.classList.add("modal");
      modal.classList.add("modalLogin");

      var modalHead = document.createElement("div");
      modalHead.id = "modalHead";
      modalHead.classList.add("modalHead");
      modal.appendChild(modalHead);

      var modalTitle = document.createElement("div");
      modalTitle.id = "modalTitle";
      modalTitle.classList.add("modalTitle");
      modalTitle.classList.add("bold");
      modalTitle.textContent = "Anmelden/Registieren";
      modalHead.appendChild(modalTitle);

      var closeSpan = document.createElement("span");
      closeSpan.id = "closeSpan";
      closeSpan.classList.add("closeSpan");
      closeSpan.innerHTML = "&times";
      modal.appendChild(closeSpan);

      var modalSignIn = document.createElement("div");
      modalSignIn.id = "modalSignIn";
      modalSignIn.classList.add("modalColumn");
      modalSignIn.classList.add("modalSignIn");
      modal.appendChild(modalSignIn);

      var labelUsername = document.createElement("lbl");
      labelUsername.textContent = "Nickname:";
      labelUsername.classList.add("lbl");
      labelUsername.classList.add("modalLbl");
      modalSignIn.appendChild(labelUsername);

      var inputUsername = document.createElement("input");
      inputUsername.id = "inputUsernameSignIn";
      inputUsername.classList.add("ipt");
      inputUsername.classList.add("modalIpt");
      inputUsername.placeholder = "Dein Nickname";
      modalSignIn.appendChild(inputUsername);

      var labelPassword = document.createElement("lbl");
      labelPassword.classList.add("lbl");
      labelPassword.classList.add("modalLbl");
      labelPassword.textContent = "Passwort:";
      modalSignIn.appendChild(labelPassword);

      var inputPassword = document.createElement("input");
      inputPassword.id = "inputPasswordSignIn";
      inputPassword.type = "password";
      inputPassword.classList.add("ipt");
      inputPassword.classList.add("modalIpt");
      inputPassword.placeholder = "Dein Passwort";
      modalSignIn.appendChild(inputPassword);

      var btnLoginModal = document.createElement("button");
      btnLoginModal.id = "btnLoginModal";
      btnLoginModal.classList.add("btn");
      btnLoginModal.classList.add("modalBtn");
      btnLoginModal.textContent = "Anmelden";
      modalSignIn.appendChild(btnLoginModal);
      btnLoginModal.addEventListener("click", sendLoginData);

      var errorSignIn = document.createElement("div");
      errorSignIn.id = "errorSignIn";
      errorSignIn.classList.add("err");
      errorSignIn.classList.add("modalErr");
      modalSignIn.appendChild(errorSignIn);

      var lneModal = document.createElement("h2");
      lneModal.id = "lne";
      lneModal.classList.add("lneModal");
      modal.appendChild(lneModal);

      var modalSignUp = document.createElement("div");
      modalSignUp.id = "modalSignUp";
      modalSignUp.classList.add("modalColumn");
      modalSignUp.classList.add("modalSignUp");
      modal.appendChild(modalSignUp);

      var labelUsername = document.createElement("lbl");
      labelUsername.classList.add("lbl");
      labelUsername.classList.add("modalLbl");
      labelUsername.textContent = "Nickname";
      modalSignUp.appendChild(labelUsername);

      var inputUsername = document.createElement("input");
      inputUsername.id = "inputUsernameSignUp";
      inputUsername.classList.add("ipt");
      inputUsername.classList.add("modalIpt");
      inputUsername.placeholder = "Dein Nickname";
      modalSignUp.appendChild(inputUsername);

      var labelPassword = document.createElement("label");
      labelPassword.classList.add("lbl");
      labelPassword.classList.add("modalLbl");
      labelPassword.textContent = "Passwort:";
      modalSignUp.appendChild(labelPassword);

      var inputPassword = document.createElement("input");
      inputPassword.id = "inputPasswordSignUp";
      inputPassword.classList.add("ipt");
      inputPassword.classList.add("modalIpt");
      inputPassword.type = "password";
      inputPassword.placeholder = "Dein Passwort";
      modalSignUp.appendChild(inputPassword);

      var labelEmail = document.createElement("label");
      labelEmail.classList.add("lbl");
      labelEmail.classList.add("modalLbl");
      labelEmail.textContent = "Email:";
      modalSignUp.appendChild(labelEmail);

      var inputEmail = document.createElement("input");
      inputEmail.id = "inputEmailSignUp";
      inputEmail.classList.add("ipt");
      inputEmail.classList.add("modalIpt");
      inputEmail.placeholder = "Deine Email (optional)";
      modalSignUp.appendChild(inputEmail);

      var buttonSignUp = document.createElement("button");
      buttonSignUp.id = "btnSignUp";
      buttonSignUp.classList.add("btn");
      buttonSignUp.classList.add("modalBtn");
      buttonSignUp.textContent = "Registieren";
      modalSignUp.appendChild(buttonSignUp);
      buttonSignUp.addEventListener("click", sendSignUpData);

      var errorSignUp = document.createElement("div");
      errorSignUp.id = "errorSignUp";
      errorSignUp.classList.add("err");
      errorSignUp.classList.add("modalErr");
      modalSignUp.appendChild(errorSignUp);

      document.getElementById("nav").appendChild(modal);

      modal.style.display = "flex";

      window.onclick = function(event) {
        if (event.target.id == "closeSpan")
          modal.remove();
      }
    }
  }

  function sendSignUpData() {
    var username = document.getElementById("inputUsernameSignUp").value;
    var password = document.getElementById("inputPasswordSignUp").value;
    var email = document.getElementById("inputEmailSignUp").value;

    if (username != "" && password != "") {
      var xhr = new XMLHttpRequest();
      xhr.open("POST", "http://" + ipAdress + "/users/create/", true);
      xhr.onload = function() {
        if (this.status === 200) {
          console.log("hi");
          setErr("errorSignUp", "Account erfolgreich erstellt");
          document.getElementById("userIcon").style.display = "block";
          document.getElementById("userIcon").addEventListener("click", function(){
            showUserDropMenu(username);
          });
          document.getElementById("btnLogin").textContent = "Sie sind angemeldet";
          document.getElementById("btnLogin").removeEventListener("click", showLoginModalBox);
        } else if (this.status === 409) {
          setErr("errorSignUp", "Nutzer existiert schon");
        }
      }
      if (email == "") {
        xhr.send(JSON.stringify({
          userName: username,
          password: password
        }));
      } else {
        xhr.send(JSON.stringify({
          userName: username,
          password: password,
          email: email
        }));
      }
    } else
      document.getElementById("errorSignUp").textContent += "Nickname oder Passwort fehlt";
  }

  function sendLoginData() {
    var username = document.getElementById("inputUsernameSignIn").value;
    var password = document.getElementById("inputPasswordSignIn").value;

    if (username != "" && password != "") {
      var xhr = new XMLHttpRequest();
      xhr.open("POST", "http://" + ipAdress + "/users/login/", true);
      xhr.onload = function() {
        if (this.status === 200) {
          document.getElementById("userIcon").style.display = "block";
          document.getElementById("userIcon").addEventListener("click", function(){
            showUserDropMenu(username);
          });
          document.getElementById("btnLogin").textContent = "Sie sind angemeldet";
          document.getElementById("btnLogin").removeEventListener("click", showLoginModalBox);
          document.getElementById("modalLogin").remove();
        } else if (this.status === 422) {
          setErr("errorSignIn", "Nickname oder Passwort falsch");
        }
      }
      xhr.send(JSON.stringify({
        userName: username,
        password: password
      }));
    } else {
      setErr("errorSignIn", "Nickname oder Passwort fehlt");
    }
  }

  function showUserDropMenu(username) {
    if (document.getElementById("modalUserDropMenu") == null) {
      console.log("yeah");
      var modalUserDropMenu = document.createElement("div");
      modalUserDropMenu.id = "modalUserDropMenu";
      modalUserDropMenu.classList.add("drpDwn");
      modalUserDropMenu.classList.add("DrpDwnUserDropMenu");

      var modalHead = document.createElement("div");
      modalHead.id = "modalHeadUserDropMenu";
      modalHead.classList.add("drpDwnHead");
      modalUserDropMenu.appendChild(modalHead);

      var modalTitle = document.createElement("div");
      modalTitle.id = "modalTitleUserDropMenu";
      modalTitle.classList.add("bold");
      modalTitle.classList.add("center");
      modalTitle.textContent = username;
      modalHead.appendChild(modalTitle);

      var closeSpan = document.createElement("span");
      closeSpan.id = "closeSpan";
      closeSpan.classList.add("closeSpan");
      closeSpan.innerHTML = "&times";
      modalUserDropMenu.appendChild(closeSpan);

      var aManageAcc = document.createElement("a");
      aManageAcc.id = "aManageAcc";
      aManageAcc.classList.add("a");
      aManageAcc.classList.add("center");
      aManageAcc.classList.add("aManageAcc");
      aManageAcc.classList.add("drpDwnCntnt");
      aManageAcc.textContent = "Account Einstellungen";
      aManageAcc.href = "html/manageAccount.html";
      modalUserDropMenu.appendChild(aManageAcc);

      document.getElementById("nav").appendChild(modalUserDropMenu);

      modalUserDropMenu.style.display = "flex";

      window.onclick = function() {
        if (event.target.id == "closeSpan") {
          modalUserDropMenu.remove();
        }
      }
    }
  }

  function setErr(id, text) {
    if (text != document.getElementById(id).textContent)
      document.getElementById(id).textContent = text;
  }

  function showSettingsModalBox() {
    if (document.getElementsByClassName("modal").length == 0) {
      var modalSettings = document.createElement("div");
      modalSettings.id = "modalSettings";
      modalSettings.classList.add("modal");
      modalSettings.classList.add("modalSettings");

      var modalHead = document.createElement("div");
      modalHead.id = "modalHead";
      modalHead.classList.add("modalHead");
      modalSettings.appendChild(modalHead);

      var modalTitle = document.createElement("div");
      modalTitle.id = "modalTitle";
      modalTitle.classList.add("modalTitle");
      modalTitle.classList.add("bold");
      modalTitle.textContent = "Einstellungen";
      modalHead.appendChild(modalTitle);

      var closeSpan = document.createElement("span");
      closeSpan.id = "closeSpan";
      closeSpan.classList.add("closeSpan");
      closeSpan.innerHTML = "&times";
      modalSettings.appendChild(closeSpan);

      var labelDesign = document.createElement("lbl");
      labelDesign.classList.add("lbl");
      labelDesign.classList.add("modalLbl");
      labelDesign.textContent = "Design:";
      modalSettings.appendChild(labelDesign);

      var selectDesign = document.createElement("select");
      selectDesign.id = "selectDesign";
      selectDesign.classList.add("slct");
      selectDesign.classList.add("modalSlct");

      var optionLight = document.createElement("option");
      optionLight.id = "optionLight";
      optionLight.value = "light";
      optionLight.textContent = "hell";
      optionLight.classList.add("option");
      optionLight.classList.add("modalOption");
      selectDesign.appendChild(optionLight);

      var optionDark = document.createElement("option");
      optionDark.id = "optionDark";
      optionDark.value = "dark";
      optionDark.textContent = "dunkel";
      optionDark.classList.add("optn");
      optionDark.classList.add("modalOptn");
      selectDesign.appendChild(optionDark);

      var design = localStorage.getItem("design");
      if (design == null || typeof design == "undefined")
        design = "light";

      selectDesign.value = design;
      modalSettings.appendChild(selectDesign);

      var btnSave = document.createElement("button");
      btnSave.id = "btnSave";
      btnSave.classList.add("btn");
      btnSave.classList.add("modalBtn");
      btnSave.textContent = "Speichern";
      modalSettings.appendChild(btnSave);

      btnSave.addEventListener("click", function() {
        localStorage.setItem("design", document.getElementById("selectDesign").value);
        window.location.reload();
      });

      var linkDiv = document.createElement("div");
      linkDiv.id = "linkDiv";
      linkDiv.classList.add("linkDiv");
      modalSettings.appendChild(linkDiv);

      var linkToGithubIcon = document.createElement("a");
      linkToGithubIcon.id = "linkToGithubIcon";
      linkToGithubIcon.classList.add("a");
      linkToGithubIcon.classList.add("modalA");
      linkToGithubIcon.classList.add("linkTo");
      linkToGithubIcon.href = "https://www.iconfinder.com/icons/298822/github_mark_icon";
      linkToGithubIcon.textContent = "Github Icon";
      linkDiv.appendChild(linkToGithubIcon);

      var linkToSettingIcon = document.createElement("a");
      linkToSettingIcon.id = "linkToSettingIcon";
      linkToSettingIcon.classList.add("a");
      linkToSettingIcon.classList.add("modalA");
      linkToSettingIcon.classList.add("linkTo");
      linkToSettingIcon.href = "https://www.iconfinder.com/Chanut-is";
      linkToSettingIcon.textContent = "Einstellungen Icon";
      linkDiv.appendChild(linkToSettingIcon);

      var linkToUserIcon = document.createElement("a");
      linkToUserIcon.id = "linkToUserIcon";
      linkToUserIcon.classList.add("a");
      linkToUserIcon.classList.add("modalA");
      linkToUserIcon.classList.add("linkTo");
      linkToUserIcon.href = "https://www.iconfinder.com/icons/172627/male_user_icon";
      linkToUserIcon.textContent = "Benutzer Icon";
      linkDiv.appendChild(linkToUserIcon);

      document.getElementById("nav").appendChild(modalSettings);

      window.onclick = function(event) {
        if (event.target.id == "closeSpan")
          modalSettings.remove();
      }

      modalSettings.style.display = "flex";
    }
  }

  setTopComments();
  setTopWebsites();
});
