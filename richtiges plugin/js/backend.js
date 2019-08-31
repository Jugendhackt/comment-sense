document.addEventListener("DOMContentLoaded", function() {
  const ipAdress = "192.168.2.105";
  document.getElementById("btnSendComment").addEventListener("click", () => {
    var title = document.getElementById("inputHeadline").value;
    var comment = document.getElementById("inputComment").value;
    getUserData()
      .then(function(result) {
        if (typeof result != "undefined") {
          var xhr = new XMLHttpRequest();
          xhr.open("POST", "http://" + ipAdress + "/comments/", true);
          xhr.onload = function() {
            if (this.status === 201)
              bootbox.alert("Kommentar erfolgreich erstellt");
            else
              bootbox.alert("Es gab ein Fehler!");
          }
          getUrl()
            .then(function(url) {
              xhr.send(JSON.stringify({
                userName: result.username,
                password: result.password,
                headline: title,
                content: comment,
                url: url
              }));
            });
        }
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
            getXhr("http://" + ipAdress + "/comments/site='" + url + "',name='" + result.username + "'", true)
              .then(function(result) {
                if (result.status === 200 || result.status === 404) {
                  var data = JSON.parse(result.responseText);
                  console.log(data);
                  for (let i = 0; i < data.comments.length; i++) {
                    let username = data.comments[i].userName;
                    let headline = data.comments[i].headline;
                    let comment = data.comments[i].content;
                    let votes = data.comments[i].votes;
                    let voted = data.comments[i].voted;
                    let date = data.comments[i].date;
                    let id = data.comments[i].id;
                    showComment(username, headline, comment, votes, voted, date, id);
                  }
                }
              });
          } else {
            getXhr("http://" + ipAdress + "/comments/site='" + url + "'", true)
              .then(function(result) {
                if (result.status === 200 || result.status === 404) {
                  var data = JSON.parse(result.responseText);
                  console.log(data);
                  for (let i = 0; i < data.comments.length; i++) {
                    let username = data.comments[i].userName;
                    let headline = data.comments[i].headline;
                    let comment = data.comments[i].content;
                    let votes = data.comments[i].votes;
                    let voted = data.comments[i].voted;
                    let date = data.comments[i].date;
                    let id = data.comments[i].id;
                    showComment(username, headline, comment, votes, voted, date, id);
                  }
                }
              });
          }
        });
    });
  }

  function showComment(username, title, comment, votes, voted, date, id, ) {
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
    getUserData()
      .then(function(result) {
        var bottomDiv = document.createElement("div");
        var img = document.createElement("img");
        img.id = "img" + id;
        if (voted == 1) {
          img.src = "assets/icons/unlike.png";
          img.title = "unlike.png";
        } else {
          img.src = "assets/icons/like.png";
          img.title = "like.png";
        }
        bottomDiv.appendChild(img);
        var span = document.createElement("span");
        span.textContent = votes;
        span.id = "votes" + id;
        bottomDiv.appendChild(span);
        bottomDiv.addEventListener("click", function() {
          clickVote(id);
        });
        div.appendChild(bottomDiv);
      });
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
        console.log(result);
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

  function getXhr(url, async) {
    return new Promise(function(resolve) {
      var xhr = new XMLHttpRequest();
      xhr.open("GET", url, async);
      xhr.onload = function() {
        resolve(this);
      }
      xhr.send();
    });
  }


  function clickVote(id) {
    console.log("clickVote");
    getUserData()
      .then(function(result) {
        if (typeof result != "undefined") {
          var xhr = new XMLHttpRequest();
          xhr.open("PATCH", "http://" + ipAdress + "/comments/vote/", true);
          if (document.getElementById("img" + id).title == "like.png") {
            xhr.onload = function() {
              if (this.status === 200) {
                document.getElementById("img" + id).src = "assets/icons/unlike.png";
                document.getElementById("img" + id).title = "unlike.png";
                document.getElementById("votes" + id).textContent = parseInt(document.getElementById("votes" + id).textContent) + 1;
              }
            }
            xhr.send(JSON.stringify({
              userName: result.username,
              password: result.password,
              id: id,
              vote: 1
            }));
          } else if (document.getElementById("img" + id).title == "unlike.png") {
            xhr.onload = function() {
              if (this.status === 200) {
                document.getElementById("img" + id).src = "assets/icons/like.png";
                document.getElementById("img" + id).title = "like.png";
                document.getElementById("votes" + id).textContent = parseInt(document.getElementById("votes" + id).textContent) - 1;
              }
            }
            xhr.send(JSON.stringify({
              userName: result.username,
              password: result.password,
              id: id,
              vote: -1
            }));
          }
        }
      });
  }

  checkLogin();
  reload();
});
