document.addEventListener("DOMContentLoaded", function() {
	document.getElementById("login").addEventListener("click", loginUser);

	const ipAdress = "192.168.2.113";


	function loginUser() {
		var userName = document.getElementById("inputUserName").value;
		var password = document.getElementById("inputPassword").value;

		var date = new Date();
		date.setHours(date.getHours() + 1);
		date = date.getTime();
		setErr(date + "");


		if(userName == "" || password == "")
			setErr("Passwort oder Nutzername leer!");
		else {
			var xhr = new XMLHttpRequest();
			xhr.open("POST", "http://" + ipAdress + "/users/login/", true);
			xhr.onload = function() {
				//setErr(this.responseText);
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
		}

	}

	function setErr(err) {
		document.getElementById("error").innerHTML += err;
	}

});