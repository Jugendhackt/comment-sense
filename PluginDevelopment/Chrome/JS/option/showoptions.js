document.addEventListener("DOMContentLoaded", function() {
  document.getElementById("showHidePassword").addEventListener("click", showHidePassword);
  document.getElementById("edit").addEventListener("click", showEditPage);

  const inputusername = document.getElementById("inputUserName");
  const inputpassword = document.getElementById("inputPassword");
  const inputemail = document.getElementById("inputEmail");
  const error = document.getElementById("error");

  function showOptions() {
    chrome.storage.sync.get(["username", "password", "email"], function(result) {
      if (typeof result.username === "undefined")
        error.innerHTML += "Nickname existiert nicht!";
      else
        inputusername.value = result.username;

      if (typeof result.password === "undefined")
        error.innerHTML += "Passwort existiert nicht!";
      else
        inputpassword.value = result.password;

      if (typeof result.email === "undefined")
        error.innerHTML += "Email existiert nicht!";
      else
        inputemail.value = result.email;
    });
  }

  function showHidePassword() {
    if (inputpassword.type == "text")
      inputpassword.type = "password";
    else
      inputpassword.type = "text";
  }

  function showEditPage() {
    window.location.href = "../../HTML/option/editOptions.html";
  }

  showOptions();
});
