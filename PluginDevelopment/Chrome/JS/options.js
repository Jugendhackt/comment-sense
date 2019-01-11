document.addEventListener("DOMContentLoaded", function(){
	document.getElementById("button-save").addEventListener("click", sendsaveData);
	document.getElementById("button-clear").addEventListener("click", clearData);

	var ipAdress = '192.168.56.1'

	var error = document.getElementById("error");
	var inputUsername = document.getElementById("inputUsername");
	var inputPassword = document.getElementById("inputPassword");

	function sendsaveData(){
		var username = inputUsername.value;
		var password = inputPassword.value;
		if(username == "" || password == ""){
			error.innerHTML = "Es sind nicht alle Felder ausgefüllt!";
		} else {
			error.innerHTML = "";

			//get Username or set it for the first time
			chrome.storage.sync.get(["username"], function(result){
			 if(typeof result.username === "undefined" || result.username == "")
				chrome.storage.sync.set({username: username});
			  });
			//get password or set it for the first time
			chrome.storage.sync.get(["password"], function(result){
			  if(typeof result.password === "undefined" || result.password == "")
					chrome.storage.sync.set({password: password});
			});

			var xhr = new XMLHttpRequest();
			xhr.open("POST", "http://" + ipAdress + "/users/create/", true);
			xhr.onload = function(){
				data = xhr.responseText;
			}
			xhr.send(JSON.stringify({username: username, password: password}));
		}
	}

	function clearData(){
		error.innerHTML = "";
		inputUsername.value = "";
		inputPassword.value = "";
	}
});
