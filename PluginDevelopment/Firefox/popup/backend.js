$(document).ready(function() {

function getHash(url) {
  // Get URL
  var query = { active: true, currentWindow: true };
  console.log(query);
  // Create hash
  return url.split('').reduce((prevHash, currVal) =>
    (((prevHash << 5) - prevHash) + currVal.charCodeAt(0))|0, 0);
}


function sendRequest(nickname, content) {
  var xhr = new XMLHttpRequest();
  // let hash = getHash();
  // console.log('Hash: ' + hash);
  xhr.open('GET', 'http://159.69.14.13:1234/comments/', true);
  // xhr.setRequestHeader('Content-type', 'application/commentSense');
  xhr.onload = function () {
      // do something to response
      console.log(this.responseText);
  };
  xhr.send([nickname, content]);
}
});
