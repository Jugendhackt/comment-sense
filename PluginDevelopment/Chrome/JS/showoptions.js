document.addEventListener("DOMContentLoaded", function(){
  document.getElementById("showHidePassword").addEventListener("click", showHidePassword);

  var username = document.getElementById("inputUserName");
  var password = document.getElementById("inputPassword");
  var email = document.getElementById("inputEmail");

  chrome.storage.sync.get(["username"], function(result){
    if(typeof result.username === "undefined"){
      username.value = "username existiert nicht!";
    } else {
      username.value = result.username;
    }
  });

  chrome.storage.sync.get(["password"], function(result){
    if(typeof result.password === "undefined"){
      password.value = "Passwort existiert nicht!";
    } else {
      password.value = result.password;
    }
  });

  chrome.storage.sync.get(["email"], function(result){
    if(typeof result.email === "undefined"){
      email.value = "keine Email hinterlegt";
    } else {
      email.value = result.email;
    }
  });

function showHidePassword(){
  if(password.type == "text") {
    password.type = "password";
  } else {
    password.type = "text";
  }
}

});
