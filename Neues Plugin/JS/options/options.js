document.addEventListener("DOMContentLoaded", function() {
	document.getElementById("login").addEventListener("click", loginUser);
	document.getElementById("autoLogin").addEventListener("click", autoLogin);
	document.getElementById("options").addEventListener("click", function(){
		window.location.href="../../HTML/options/settings.html";
	});

	const ipAdress = "192.168.2.108";


	function loginUser() {
		var userName = document.getElementById("inputUserName").value;
		var password = document.getElementById("inputPassword").value;

		if(userName == "" || password == "")
			setErr("Passwort oder Nutzername leer!");
		else {
			chrome.storage.local.get(["autoLogin"], function(result){
				if (typeof result.autoLogin == "undefined" || result.autoLogin == false) {

					var date = new Date();
					date.setHours(date.getHours() + 1);
					date = date.getTime();

					var xhr = new XMLHttpRequest();
					xhr.open("POST", "http://" + ipAdress + "/users/login/", true);
					xhr.onload = function() {
						var data = JSON.parse(this.responseText);
						if (this.status === 200 && data.status == "login data valid") {
							setErr("angemeldet");

							chrome.storage.local.set({"userName": userName, "password": password, "time": date});


						} else if(this.status == "400") {
							setErr("Nutzerdaten sind nicht vollständig!");
						} else {
							setErr(this.responseText);
						}
					}
					xhr.send(JSON.stringify({
						userName: userName,
						password: password
					}));
				} else if(result.autoLogin == true) {
					var date = new Date();
					date.setDate(date.getDay() + 10);
					date = date.getTime();

					var xhr = new XMLHttpRequest();
					xhr.open("POST", "http://" + ipAdress + "/users/login/", true);
					xhr.onload = function() {
						var data = JSON.parse(this.responseText);
						if (this.status === 200 && data.status == "login data valid"){

							chrome.storage.local.set({
								"userName": userName,
								"password": password,
								"time": date
							});
							setErr("angemeldet mit automatischen anmelden");
							setErr("Bitte öffne das Plugin neu");
							setAutoLoginErr("");
						} else if (this.status === 400)
							setErr("Nutzerdaten nicht vollständig");
						else
							setErr(this.status);
					}
					xhr.send(JSON.stringify({
						userName: userName,
						password: password
					}));
				}
			});

		}

	}

	function setErr(data) {
		if (document.getElementById("error").innerHTML == "")
			document.getElementById("error").innerHTML = data;
		else
			document.getElementById("error").innerHTML += "<br>" + data;
	}

	function setAutoLoginErr(data){
		document.getElementById("autoLoginError").innerHTML = data;
	}

	function setData() {
		var time = new Date();
		time = time.getTime();

		chrome.storage.local.get(["userName", "password", "time"], function(result){
			if (result.time > time) {
				document.getElementById("inputUserName").value = result.userName;
				document.getElementById("inputPassword").value = result.password;
				setErr("Du bist bereits angemeldet");
			}
		});
	}

	function autoLogin() {
		chrome.storage.local.get(["autoLogin"], function(result){
			if (typeof result.autoLogin == "undefined" || result.autoLogin == false) {
				chrome.storage.local.set({"autoLogin": true});
				setAutoLoginErr("automatisches Anmelden aktiv");
			} else if (result.autoLogin == true) {
				chrome.storage.local.set({"autoLogin": false});
				setAutoLoginErr("automatisches Anmelden nicht aktiv");
			}
		});
	}

	setData();
});
