document.addEventListener("DOMContentLoaded", function() {
  const ipAdress = "192.168.2.110";
  document.getElementById("aLogin").addEventListener("click", function() {
    bootbox.dialog({
      title: "Anmelden",
      size: "lg",
      message: "<form><div class='form-group'><label>Nickname:</label><input class='form-control' id='inputUsername' placeholder='Dein Nickname'></div><div class='form-group'><label>Password:</label><input class='form-control' id='inputPassword' type='password' placeholder='Dein Passwort'></div></form>",
      buttons: {
        confirm: {
          label: "Anmelden",
          className: "btn-primary",
          callback: function() {
            var username = document.getElementById("inputUsername").value;
            var password = document.getElementById("inputPassword").value;
            if (username != "" || password != "") {
              var xhr = new XMLHttpRequest();
              xhr.open("POST", "http://" + ipAdress + "/users/login/", true);
              xhr.onload = function() {
                if (this.status === 200) {
                  bootbox.alert("Du hast dich erfolgreich angemeldet");
                } else if (this.status === 404 || this.status === 422) {
                  bootbox.alert("Nickname oder Passwort ist falsch");
                }
              }
              xhr.send(JSON.stringify({
                userName: username,
                password: password
              }));
            }
          }
        },
        cancel: {
          label: "Schließen",
          className: "btn-danger",
        }
      }
    });
  });

  function setTopWebsites() {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "http://" + ipAdress + "/sites/top/", true);
    xhr.onload = function() {
      if (this.status === 200) {
        var data = JSON.parse(this.responseText);
        console.log(data);
        for (var i = 0; i < data.sites.length; i++) {
          var websiteHeading = data.sites[i].url;
          if (websiteHeading.length > 35)
            websiteHeading = websiteHeading.substring(0, 33) + "...";
          document.getElementById("websiteHeading" + i).innerText = websiteHeading;
          document.getElementById("websiteCount" + i).textContent = "Kommentare: " + data.sites[i].count;
          document.getElementById("btnVisitWebsite" + i).addEventListener("click", function() {
            window.open(data.sites[this.id.substring(15, this.id.length)].url);
          });
        }
      }
    }
    xhr.send();
  }

  function setTopComments() {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "http://" + ipAdress + "/comments/top/", true);
    xhr.onload = function() {
      var data = JSON.parse(this.responseText);
      console.log(data);

      for (var i = 0; i < data.comments.length; i++) {
        document.getElementById("commentHeading" + i).textContent = data.comments[i].headline;
        document.getElementById("commentContent" + i).textContent = data.comments[i].content;
        //document.getElementById("commentUsername" + i).textContent = data.comments[i].userName;
        document.getElementById("commentLikes" + i).textContent = data.comments[i].votes;
        //document.getElementById("commentDate" + i).textContent = data.comments[i].date;
      }
    }
    xhr.send();
  }
  setTopComments();
  setTopWebsites();
});
