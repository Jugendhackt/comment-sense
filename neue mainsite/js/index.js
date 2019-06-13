document.addEventListener("DOMContentLoaded", function() {
  document.getElementById("btnLogin").addEventListener("click", showLoginModalBox);

  const ipAdress = "192.168.2.110";

  function setTopComments() {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "http://" + ipAdress + "/comments/top/", true);
    xhr.onload = function() {
      if (this.status === 200) {
        var data = JSON.parse(this.responseText);
        for (var i = 0; i < data.Comments.length; i++) {
          var commentDiv = document.createElement("div");
          commentDiv.id = "comment" + i;
          commentDiv.classList.add("commentDiv");

          var title = document.createElement("div");
          title.id = "commentTitle" + i;
          title.classList.add("bold");
          title.textContent = data.Comments[i].headline;
          commentDiv.appendChild(title);

          var content = document.createElement("div");
          content.id = "commentContent" + i;
          content.classList.add("commentContent");
          content.textContent = data.Comments[i].content;
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
  }

  setTopComments();
  setTopWebsites();
});
