document.addEventListener("DOMContentLoaded", function(){
  document.getElementById("showHidePassword").addEventListener("click", showHidePassword);
  document.getElementById("save").addEventListener("click", saveOptions);


  var iusername = document.getElementById("inputUserName");
  var ipassword = document.getElementById("inputPassword");
  var ipassword2 = document.getElementById("inputPasswordSec");
  var iemail = document.getElementById("inputEmail");

  function saveOptions(){
    var username = iusername.value;
    var password = ipassword.value;
    var email = iemail.value;

    if(ipassword.value == ipassword2.value){
      if (email == ""){
        chrome.storage.sync.set({username: username});
        chrome.storage.sync.set({password: password});
      } else {
        chrome.storage.sync.set({username: username});
        chrome.storage.sync.set({password: password});
        chrome.storage.sync.set({email: email});
      }
      window.location.href = "../HTML/showoptions.html";
    } else {
      iusername.value = "Passwörter nicht gleich";
    }
  }

  function showHidePassword(){
    if(ipassword.type == "text") {
      ipassword.type = "password";
      ipassword2.type = "password";
    } else {
      ipassword.type = "text";
      ipassword2.type = "password";
    }
  }
});
