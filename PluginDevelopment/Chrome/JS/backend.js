document.addEventListener("DOMContentLoaded", function(){
  var buttons = document.getElementsByClassName("btn btn-primary btn-sm");
  document.getElementById("submit").addEventListener("click", sendData);

  for (var i = 0; i<buttons.length;i++){
    buttons[i].addEventListener("click", clickvote);
  }

  chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
    //alert(tabs[0].url);
    var url = tabs[0].url;
    var xhr = new XMLHttpRequest();
    var data;
    // let hash = getHash();
    // console.log('Hash: ' + hash);
    xhr.open('GET', 'http://192.168.2.114:12345/comments/' + url, true);
    // xhr.setRequestHeader('Content-type', 'application/commentSense');
    xhr.onload = function () {
      data = xhr.responseText;
      //alert(xhr.responseText);
      //data = JSON.stringify(data);
      //alert("Data:" + data);
      data = JSON.parse(data);
      alert(data.Comments.length);


        for (var i=0; i<data.Comments.length;i++){
          //alert(Object.keys(data.Comments[i]).length);
          var username = data.Comments[i].userName;
          var id = data.Comments[i].id;
          var headline = data.Comments[i].headline;
          var comment = data.Comments[i].content;
          var votes = data.Comments[i].votes;
          var userid = data.Comments[i].userId;
          displayComment(username, headline, comment, votes);
        }
      }



      /*if(data.Comments > 0){
        alert("HI");
      }*/
      //{"Comments":"no comments found"}
      //alert(data);
    //alert(xhr.responseText);
    //var json = JSON.stringify({url: url.toString()});
    //alert(json);
    xhr.send();
      //'{\"userName\":\"'+nickname+'\",\"password\":\"password4\",\"headline\":\"'+headline+'\",\"comment\":\"'+comment+'\",\"url\":\"'+url+'\"}');
      //alert("Hi");
      //'{\"url\":\"'+url+'\"}'
  });

function clickvote(){
  var id="1";
  var username="2";
  var password="3";
  var vote=true;
  var xhr = new XMLHttpRequest();
  xhr.open("PATCH", "http://192.168.2.114:12345/comments/", true);
  xhr.onload = function () {
    data = xhr.responseText;
    //alert(data);
  };
  xhr.send(JSON.stringify({comment_id: id.toString(), user: username.toString(), password: password.toString(), vote: vote}));
  alert("clicked");
}
});

function displayComment(author, headline, comment, liked) {
  console.log('Author: ' + author + ', Headline: ' + headline + ', Comment: ' + comment + ', Liked: ' + liked);
  $('#landingpage').append('<div class="card" style="width: 18rem;"> <div class="card-header"> <div class="flex-centered-vertically"> <span class="profile-image"> <img src="./assets/icons/user.svg" alt=""> </span> <h5 class="card-title">' + author + '</h5> </div> <p class="card-title-description">Gefällt ' + liked + ' mal</p> </div> <div class="card-body"> <h6 class="card-subtitle mb-2 text-muted">' + headline + '</h6> <p class="card-text">' + comment + '</p> <button type="button" class="btn btn-primary btn-sm"> <span class="like"> <img src="./assets/icons/like.svg" alt=""> </span> Gefällt mir </button> </div> </div>');
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

  if(nickname == "" || headline == "" || comment == ""){
    alert("Es sind nicht alle Felder ausgefüllt!");
  } else {
  chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
    //alert(tabs[0].url);
    var url = tabs[0].url;
    var xhr = new XMLHttpRequest();
    // let hash = getHash();
    // console.log('Hash: ' + hash);
    xhr.open('POST', 'http://192.168.2.114:12345/comments/', true);
    // xhr.setRequestHeader('Content-type', 'application/commentSense');
    xhr.onload = function () {
      console.log(xhr.responseText);
    };
    //xhr.send('{\"userName\":\"'+nickname+'\",\"password\":\"password4\",\"headline\":\"'+headline+'\",\"comment\":\"'+comment+'\",\"url\":\"'+url+'\"}');
    xhr.send(JSON.stringify({userName: nickname.toString(), password: "pass0", headline: headline.toString(), comment: comment.toString(), url: url.toString()}));
      //alert("Hi");
  });
}
}
