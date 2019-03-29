document.addEventListener("DOMContentLoaded", function() {
  var ipAdress = "192.168.2.113";
  //var password = "123";
  var buttons = document.getElementsByClassName("btn btn-primary btn-sm");
  document.getElementById("submit").addEventListener("click", sendData);

  const error = document.getElementById("error");

  function refresh() {
    //delete all displayed comments
    chrome.tabs.query({
      currentWindow: true,
      active: true
    }, function(tabs) {
      var url = tabs[0].url;
      var xhr = new XMLHttpRequest();
      var data;
      xhr.open("GET", "http://" + ipAdress + "/comments/site='" + url + "'", true);
      xhr.onload = function() {
        if (this.status === 200 || this.status == 404) {
          data = xhr.responseText;
          data = JSON.parse(data)
          document.getElementById("landingpage").innerHTML = "";
          for (let i = 0; i < data.Comments.length; i++) {
            let userid = data.Comments[i].userId;
            let username = data.Comments[i].userName;
            let id = data.Comments[i].id;
            let headline = data.Comments[i].headline;
            let comment = data.Comments[i].content;
            let votes = data.Comments[i].votes;
            buttons = document.getElementsByClassName("btn btn-primary btn-sm");
            displayComment(username, headline, comment, votes, i);
            buttons[i].addEventListener("click", function() {
              clickvote(id)
            });
          }
        } else
          alert(this.status);
      }
      xhr.send();
    });
  }
  refresh();

  function clickvote(id) {
    chrome.storage.sync.get(["username", "password"], function(result) {
      var xhr = new XMLHttpRequest();
      xhr.open("PATCH", 'http://' + ipAdress + '/comments/vote', true);
      xhr.onload = function() {
        var data = xhr.responseText;
      }
      xhr.send(JSON.stringify({
        id: id,
        userName: result.username,
        password: result.password,
        vote: 1
      }));
      //refresh();
    });
  }

  function displayComment(author, headline, comment, liked, id) {
    console.log('Author: ' + author + ', Headline: ' + headline + ', Comment: ' + comment + ', Liked: ' + liked);
    $('#landingpage').append('<div class="card" style="width: 18rem;"> <div class="card-header"> <div class="flex-centered-vertically"> <span class="profile-image"> <img src="./assets/icons/user.svg" alt=""> </span> <h5 class="card-title">' + author + '</h5> </div> <p class="card-title-description">Gefällt ' + liked + ' mal</p> </div> <div class="card-body"> <h6 class="card-subtitle mb-2 text-muted">' + headline + '</h6> <p class="card-text">' + comment + '</p> <button type="button" class="btn btn-primary btn-sm" id=' + id + '> <span class="like"> <img src="./assets/icons/like.svg" alt=""> </span> Gefällt mir </button> </div> </div>');
    if ($('footer').css('height') == '450px') {
      $('#scrollDown').addClass('visible');
    } else {
      $('#scrollDown').show();
    }
  }

  function sendData() {
    chrome.storage.sync.get(["username", "password"], function(result) {
      var headline = document.getElementById("headlineInput").value;
      var comment = document.getElementById("commentInput").value;

      if (headline == "" || comment == "")
        alert("Es sind nicht alle Felder ausgefüllt!");
      else {
        chrome.tabs.query({
          currentWindow: true,
          active: true
        }, function(tabs) {
          var url = tabs[0].url;
          var xhr = new XMLHttpRequest();
          xhr.open('POST', 'http://' + ipAdress + '/comments/', true);
          xhr.onload = function() {
            if (this.status === 200) {
              console.log(xhr.responseText);
            }
          };
          xhr.send(JSON.stringify({
            userName: result.username,
            password: result.password,
            headline: headline,
            comment: comment,
            url: url
          }));
        });
      }
    });
  }

  function readLoginData() {
    chrome.storage.sync.get("logged", function(result) {
      alert(result.logged);
      if (result.logged == true || typeof result.logged == undefined) {
        chrome.storage.sync.get(["username", "password", "save"], function(result) {
          alert(result.username);
          alert(result.password);

          alert(result.save);
          if (result.save == true) {
            var xhr = new XMLHttpRequest();
            xhr.open("POST", "http://" + ipAdress + "/users/login/", true);
            xhr.onload = function() {
              var data = JSON.parse(this.responseText);
              alert(data.status);
              if (this.status !== 200 || data.status != "login data valid") {
                window.location.href = "../../HTML/login/login.html";
              }
            }
            xhr.send(JSON.stringify({
              userName: result.username,
              password: result.password
            }));
          }
        });
      } else {
        window.location.href = "../../HTML/login/login.html";
      }
    });
  }
  readLoginData();
});
