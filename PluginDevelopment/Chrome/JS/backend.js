var ipAdress = '192.168.56.1';
var port = '12345';
document.addEventListener("DOMContentLoaded", function(){
  var buttons = document.getElementsByClassName("btn btn-primary btn-sm");
  document.getElementById("submit").addEventListener("click", sendData);
  //alert(buttons.length);

  function refresh(){
    //delete all displayed comments
    chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
    //alert(tabs[0].url);
    var url = tabs[0].url;
    var xhr = new XMLHttpRequest();
    var data;
    // let hash = getHash();
    // console.log('Hash: ' + hash);
    xhr.open('GET', 'http://'+ipAdress+':'+port+'/comments/' + url, true);
    // xhr.setRequestHeader('Content-type', 'application/commentSense');
    xhr.onload = function () {
      data = xhr.responseText;
      //alert(xhr.responseText);
      //data = JSON.stringify(data);
      //alert("Data:" + data);
      data = JSON.parse(data);
      //alert(data.Comments.length);


      document.getElementById("landingpage").innerHTML = "";
        for (let i=0; i<data.Comments.length;i++){
          //alert(Object.keys(data.Comments[i]).length);
          let userid = data.Comments[i].userId;
          let username = data.Comments[i].userName;
          let id = data.Comments[i].id;
          let headline = data.Comments[i].headline;
          let comment = data.Comments[i].content;
          let votes = data.Comments[i].votes;
          buttons = document.getElementsByClassName("btn btn-primary btn-sm");
          //alert(data.Comments[i].id);
          displayComment(username, headline, comment, votes, i);
          buttons[i].addEventListener("click", function(){clickvote(id, username, comment, userid)});
        }
      }
      xhr.send();
    });
  }


  function delay(){
    setInterval(refresh, 10000);
  }
delay();
refresh();

function clickvote(ide, username, comment, userid){
  var password="pass0";
  alert("hi");
  var xhr = new XMLHttpRequest();
  xhr.open("PATCH", 'http://'+ipAdress+':'+port+'/comments/', true);
  xhr.onload = function () {
    data = xhr.responseText;
    //alert(data);
  };
  xhr.send(JSON.stringify({id: ide, user: username, password: password, vote: 1, content: comment, userId: userid}));
  refresh();
  //alert(this.id);
}

function displayComment(author, headline, comment, liked, id) {
  console.log('Author: ' + author + ', Headline: ' + headline + ', Comment: ' + comment + ', Liked: ' + liked);
  $('#landingpage').append('<div class="card" style="width: 18rem;"> <div class="card-header"> <div class="flex-centered-vertically"> <span class="profile-image"> <img src="./assets/icons/user.svg" alt=""> </span> <h5 class="card-title">' + author + '</h5> </div> <p class="card-title-description">Gefällt ' + liked + ' mal</p> </div> <div class="card-body"> <h6 class="card-subtitle mb-2 text-muted">' + headline + '</h6> <p class="card-text">' + comment + '</p> <button type="button" class="btn btn-primary btn-sm" id='+id+'> <span class="like"> <img src="./assets/icons/like.svg" alt=""> </span> Gefällt mir </button> </div> </div>');
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
    xhr.open('POST', 'http://'+ipAdress+':'+port+'/comments/', true);
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
});
