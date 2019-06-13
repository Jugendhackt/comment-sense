document.addEventListener("DOMContentLoaded", function() {
  document.getElementById("btnLogin").addEventListener("click", showLoginModalBox);

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

          visit.addEventListener("click", function(){
            window.location.href = data.sites[this.id.substring(12, this.id.length)].url;
          });

          document.getElementById("topWebsites").appendChild(websiteDiv);
        }
      }
    }
    xhr.send();
  }

  function showLoginModalBox() {
    var modal = document.createElement("div");
    modal.id = "modal";
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
    modalHead.appendChild(closeSpan);

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
    inputPassword.classList.add("modalipt");
    inputPassword.placeholder = "Dein Passwort";
    modal.appendChild(inputPassword);

    var btnLoginModal = document.createElement("button");
    btnLoginModal.id = "btnLoginModal";
    btnLoginModal.classList.add("btn");
    btnLoginModal.classList.add("btnModal");
    btnLoginModal.textContent = "Anmelden";
    modal.appendChild(btnLoginModal);

    var btnSignUpModal = document.createElement("button");
    btnSignUpModal.id = "btnSignUpModal";
    btnSignUpModal.classList.add("btn");
    btnSignUpModal.classList.add("btnModal");
    btnSignUpModal.textContent = "Registieren";
    modal.appendChild(btnSignUpModal);

    document.getElementById("nav").appendChild(modal);

    modal.style.display = "flex";

    window.onclick = function(event) {
      if (event.target.id == "closeSpan")
        modal.remove();
    }
  }

  setTopComments();
  setTopWebsites();
});
