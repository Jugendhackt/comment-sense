document.addEventListener("DOMContentLoaded", function(){
  var buttons = document.getElementsByClassName("btn btn-primary btn-sm");
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
      alert(data);
    };
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































/*
function getHash(url) {
  // Get URL
  var query = { active: true, currentWindow: true };
  console.log(query);
  // Create hash
  return url.split('').reduce((prevHash, currVal) =>
    (((prevHash << 5) - prevHash) + currVal.charCodeAt(0))|0, 0);
  //alert(url);
}
*/
/*chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
  //alert(tabs[0].url);
  url = tabs[0].url;
  var xhr = new XMLHttpRequest();
  // let hash = getHash();
  // console.log('Hash: ' + hash);
  xhr.open('POST', 'http://192.168.2.114:12345/comments/', true);
  // xhr.setRequestHeader('Content-type', 'application/commentSense');
  xhr.onload = function () {
    console.log(xhr.responseText);
  };
  xhr.send('{\"userName\":\"User2\",\"password\":\"password2\",\"headline\":\"LOLXD\",\"comment\":\"this is the comment\",\"hash\":\"'+"halloichbins"+'\",\"url\":\"test.com\"}');
    //alert("Hi");
});
*/


/*function sendRequest(nickname, headline, content) {
//alert("hallo welt");
  var xhr = new XMLHttpRequest();
  // let hash = getHash();
  // console.log('Hash: ' + hash);
  xhr.open('POST', 'http://192.168.2.114:12345/comments/', true);
  // xhr.setRequestHeader('Content-type', 'application/commentSense');
  xhr.onload = function () {
    console.log(xhr.responseText);
  };
  xhr.send('{\"userName\":\"User2\",\"password\":\"password3\",\"headline\":\"LOLXD\",\"comment\":\"this is the comment\",\"hash\":\"'+'\"}');
    //alert("Hi");
}*/
 //sendRequest('nickname', 'headline', 'comment');
//});
