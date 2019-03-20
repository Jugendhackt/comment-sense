document.addEventListener("DOMContentLoaded", function() {
  var ipAdress = '192.168.56.1';
  var password = "pass0";
  var username = "Nick73";
  var buttons = document.getElementsByClassName("btn btn-primary btn-sm");
  document.getElementById("submit").addEventListener("click", sendData);

  function refresh() {
    //delete all displayed comments
    chrome.tabs.query({
      currentWindow: true,
      active: true
    }, function(tabs) {
      var url = tabs[0].url;
      var xhr = new XMLHttpRequest();
      var data;
      xhr.open('GET', 'http://' + ipAdress + '/comments/' + url, true);
      xhr.onload = function() {
        if (this.status === 200) {
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
        } else {
					alert(this.status);
				}
      }
      xhr.send();
    });
  }

  function delay() {
    setInterval(refresh, 10000);
  }

  delay();
  refresh();

  function clickvote(id) {
    var xhr = new XMLHttpRequest();
    xhr.open("PATCH", 'http://' + ipAdress + '/comments/vote', true);
    xhr.onload = function() {
      data = xhr.responseText;
    };
    xhr.send(JSON.stringify({
      id: id,
      userName: username,
      password: password,
      vote: 1
    }));
    refresh();
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
    var nickname = document.getElementById("nicknameInput").value;
    var headline = document.getElementById("headlineInput").value;
    var comment = document.getElementById("commentInput").value;

    if (nickname == "" || headline == "" || comment == "") {
      alert("Es sind nicht alle Felder ausgefüllt!");
    } else {
      chrome.tabs.query({
        currentWindow: true,
        active: true
      }, function(tabs) {
        var url = tabs[0].url;
        var xhr = new XMLHttpRequest();
        xhr.open('POST', 'http://' + ipAdress + '/comments/', true);
        xhr.onload = function() {
					if(this.status === 200){
						console.log(xhr.responseText);
					} else {
						alert(this.status);
					}
        };
        xhr.send(JSON.stringify({
          userName: nickname.toString(),
          password: password,
          headline: headline.toString(),
          comment: comment.toString(),
          url: url.toString()
        }));
      });
    }
  }
});
