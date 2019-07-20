document.addEventListener("DOMContentLoaded", function() {
  const ipAdress = "192.168.2.110";
  console.log(getUrl());
  document.getElementById("btnSendComment").addEventListener("click", () => {
    var title = document.getElementById("inputHeadline").value;
    var comment = document.getElementById("inputComment").value;
    chrome.storage.local.get(["username", "password"], (result) => {
      bootbox.alert(result.password);
      if (typeof result.username != "undefined" && typeof result.password != "undefined") {
        var xhr = new XMLHttpRequest();
        xhr.open("POST", "http://" + ipAdress + "/comments/", true);
        xhr.onload = function() {
          bootbox.alert(this.responseText);
          if (this.status === 200) {
            bootbox.alert("hi");
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

      var xhr = new XMLHttpRequest();
      xhr.open("GET", "http://" + ipAdress + "/comments/site='" + url + "'", true);
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
            showComment(username, headline, comment, votes, date);
          }
        }
      }
      xhr.send();
    });
  }

  function showComment(username, title, comment, votes, date) {
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
    bottomDiv.appendChild(img);
    var span = document.createElement("span");
    span.textContent = votes;
    bottomDiv.appendChild(span);
    div.appendChild(bottomDiv);
    document.getElementById("landingpage").appendChild(a);
  }

  function checkLogin() {
    chrome.storage.local.get(["username", "password"], function(result) {
      if (typeof result.username != "undefined" || typeof result.password != "undefined") {
        var xhr = new XMLHttpRequest();
        xhr.open("GET", "http://" + ipAdress + "/users/login/", true);
        xhr.onload = function() {
          if (this.status === 200) {
            document.getElementById("userIcon").addEventListener("click", function() {
              bootbox.alert(result.username);
            });
          }
        }
        xhr.send(JSON.stringify({
          userName: result.username,
          password: result.password
        }));
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
  checkLogin();
  reload();
});
