document.addEventListener("DOMContentLoaded", function() {
  document.getElementById("btnLogin").addEventListener("click", showLoginModalBox);
  document.getElementById("settingIcon").addEventListener("click", showSettingsModalBox);
  document.getElementById("linkToGithub").addEventListener("click", function(){
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

      var labelUsername = document.createElement("label");
      labelUsername.textContent = "Nickname:";
      labelUsername.classList.add("label");
      labelUsername.classList.add("modalLabel");
      modal.appendChild(labelUsername);

      var inputUsername = document.createElement("input");
      inputUsername.id = "inputUsername";
      inputUsername.classList.add("ipt");
      inputUsername.classList.add("modalipt");
      inputUsername.placeholder = "Dein Nickname";
      modal.appendChild(inputUsername);

      var labelPassword = document.createElement("label");
      labelPassword.classList.add("label");
      labelPassword.classList.add("modalLabel");
      labelPassword.textContent = "Passwort:";
      modal.appendChild(labelPassword);

      var inputPassword = document.createElement("input");
      inputPassword.id = "inputPassword";
      inputPassword.type = "password";
      inputPassword.classList.add("ipt");
      inputPassword.classList.add("modalIpt");
      inputPassword.placeholder = "Dein Passwort";
      modal.appendChild(inputPassword);

      var btnLoginModal = document.createElement("button");
      btnLoginModal.id = "btnLoginModal";
      btnLoginModal.classList.add("btn");
      btnLoginModal.classList.add("modalBtn");
      btnLoginModal.textContent = "Anmelden";
      modal.appendChild(btnLoginModal);

      var btnSignUpModal = document.createElement("button");
      btnSignUpModal.id = "btnSignUpModal";
      btnSignUpModal.classList.add("btn");
      btnSignUpModal.classList.add("modalBtn");
      btnSignUpModal.textContent = "Registieren";
      modal.appendChild(btnSignUpModal);

      document.getElementById("nav").appendChild(modal);

      modal.style.display = "flex";

      window.onclick = function(event) {
        if (event.target.id == "closeSpan")
          modal.remove();
      }
    }
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

      var labelDesign = document.createElement("label");
      labelDesign.classList.add("label");
      labelDesign.classList.add("modalLabel");
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
