document.addEventListener("DOMContentLoaded", function(){
	document.getElementById("button-save").addEventListener("click", sendsaveData);
	document.getElementById("button-savePassword").addEventListener("click", PasswordStatefnc);
	var ipAdress = '192.168.56.1'
	var PasswordState = false;

	chrome.storage.sync.get(["PasswordState"], function(result){
		if(typeof result.PasswordState === "undefined"){
			chrome.storage.sync.set({PasswordState: PasswordState})
		} else {
			PasswordState = result.PasswordState;
		}
	});

	checkPasswordvalue();

	var error = document.getElementById("error");
	var inputUsername = document.getElementById("inputUsername");
	var inputPassword = document.getElementById("inputPassword");
	var savePassword = document.getElementById("button-savePassword");

	function sendsaveData(){
		var username = inputUsername.value;
		var password = inputPassword.value;
		if(username == "" || password == ""){
			error.innerHTML = "Es sind nicht alle Felder ausgefüllt!";
		} 
		else {
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
		}
	}

	function PasswordStatefnc() {
		if(stateSavePassword == false) {
			error.innerHTML = "Passwort wird gespeichert!";
			stateSavePassword = true;
			chrome.storage.sync.set({PasswordState: stateSavePassword});
		} else {
			error.innerHTML = "";
			stateSavePassword = false;
			chrome.storage.sync.set({PasswordState: stateSavePassword});
		}
	}

	function checkPasswordvalue(){
		chrome.storage.sync.get(["PasswordState"], function(result){
			if(result.PasswordState == true){
				chrome.tabs.query({title: "Erweiterte Optionen"}, function(tabs){
					if(tabs.length < 1){
						window.location.href = "./HTML/login.html";
						window.open("./HTML/alloptions.html", "_blank");
					}
				});
			}
		});
	}
});
