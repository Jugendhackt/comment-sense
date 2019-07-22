document.addEventListener("DOMContentLoaded", function() {
  const ipAdress = "192.168.2.110";
  document.getElementById("btnSendComment").addEventListener("click", () => {
    var title = document.getElementById("inputHeadline").value;
    var comment = document.getElementById("inputComment").value;
    getUserData()
      .then(function(result) {
        var xhr = new XMLHttpRequest();
        xhr.open("POST", "http://" + ipAdress + "/comments/", true);
        xhr.onload = function() {
          bootbox.alert(this.responseText);
          if (this.status === 200) {
            bootbox.alert("Kommentar erfolgreich erstellt");
          }
        }
        getUrl()
          .then(function(url) {
            console.log(url);
            xhr.send(JSON.stringify({
              userName: result.username,
              password: result.password,
              headline: title,
              content: comment,
              url: url
            }));
          });
      });
  });

  function reload() {
    chrome.tabs.query({
      currentWindow: true,
      active: true
    }, function(tabs) {
      var url = tabs[0].url;
      console.log(tabs[0]);

      getUserData()
        .then(function(result) {
          if (typeof result != "undefined") {
            var xhr = new XMLHttpRequest();
            xhr.open("GET", "http://" + ipAdress + "/comments/site='" + url + "',name='" + result.username + "'", true);
            xhr.onload = function() {
              if (this.status === 200 || this.status === 404) {
                var data = JSON.parse(this.responseText);
                console.log(data);
                for (let i = 0; i < data.comments.length; i++) {
                  let username = data.comments[i].userName;
                  let headline = data.comments[i].headline;
                  let comment = data.comments[i].content;
                  let votes = data.comments[i].votes;
                  let date = data.comments[i].date;
                  let id = data.comments[i].id;
                  showComment(username, headline, comment, votes, date, id);
                }
              }
            }
            xhr.send();
          }
        });
    });
  }

  function showComment(username, title, comment, votes, date, id) {
    var a = document.createElement("a");
    a.classList.add("list-group-item", "list-group-item-action", "mb-4", "border", "border-primary");
    var div = document.createElement("div");
    div.classList.add("d-flex", "w-100", "justify-content-between");
    a.appendChild(div);
    var heading = document.createElement("h5");
    heading.classList.add("mb-1");
    heading.textContent = title;
    div.appendChild(heading);
    var publicationDate = document.createElement("small");
    publicationDate.classList.add("text-muted");
    publicationDate.textContent = date;
    div.appendChild(publicationDate);
    var p = document.createElement("p");
    p.classList.add("mb-1");
    p.innerHTML = comment;
    a.appendChild(p);
    var div = document.createElement("div");
    div.classList.add("d-flex", "w-100", "justify-content-between");
    var small = document.createElement("small");
    small.classList.add("text-muted");
    small.textContent = username;
    div.appendChild(small);
    a.appendChild(div);
    var bottomDiv = document.createElement("div");
    var img = document.createElement("img");
    img.src = "assets/icons/like.png";
    img.id = "img" + id;
    bottomDiv.appendChild(img);
    var span = document.createElement("span");
    span.textContent = votes;
    span.id = "votes" + id;
    bottomDiv.appendChild(span);
    bottomDiv.addEventListener("click", function() {
      clickVote(id);
    });
    div.appendChild(bottomDiv);
    document.getElementById("landingpage").appendChild(a);
  }

  function checkLogin() {
    getUserData()
      .then(function(result) {
        if (typeof result != "undefined") {
          var xhr = new XMLHttpRequest();
          xhr.open("POST", "http://" + ipAdress + "/users/login/", true);
          xhr.onload = function() {
            if (this.status !== 200) {
              document.getElementById("footer").className = "";
              document.getElementById("footer").style.display = "none";
            }
          }
          xhr.send(JSON.stringify({
            userName: result.username,
            password: result.password
          }));
        } else {
          document.getElementById("footer").className = "";
          document.getElementById("footer").style.display = "none";
        }
      });
  }

  function getUrl() {
    return new Promise(function(resolve) {
      chrome.tabs.query({
        currentWindow: true,
        active: true
      }, (result) => {
        resolve(result[0].url);
      });
    });
  }

  function getUserData() {
    return new Promise(function(resolve) {
      chrome.storage.local.get(["username", "password"], function(result) {
        if (typeof result.username != "undefined" && typeof result.password != "undefined")
          resolve(result);
        else
          resolve(undefined);
      });
    })
  }

  function clickVote(id) {
    console.log(id);
    getUserData()
      .then(function(result) {
        if (typeof result != "undefined") {
          var xhr = new XMLHttpRequest();
          xhr.open("PATCH", "http://" + ipAdress + "/comments/vote/", true);
          xhr.onload = function() {
            if (this.status == 200) {
              document.getElementById("img" + id).src = "assets/icons/unlike.png"
              document.getElementById("votes" + id).textContent = parseInt(document.getElementById("votes" + id).textContent) + 1;
            } else {
              bootbox.alert("Es gab ein Fehler beim Posten des Kommentar");
            }
          }
          xhr.send(JSON.stringify({
            userName: result.username,
            password: result.password,
            id: id,
            vote: 1
          }));
        }
      });
  }

  checkLogin();
  reload();
});
