document.addEventListener("DOMContentLoaded", function() {
	document.getElementById("send").addEventListener("click", writeComment);


	const ipAdress = "192.168.2.113";
	const userName = "Test1";
	const password = "123";


	function refresh() {
		chrome.tabs.query({
			currentWindow: true,
			active: true
		}, function(tabs){
			var url = tabs[0].url;
			var xhr = new XMLHttpRequest();
			xhr.open("GET", "http://" + ipAdress + "/comments/site='" + url + "'", true);			xhr.onload = function() {
				if (this.status === 200 || this.status === 404) {
					var data = JSON.parse(this.responseText);
					//document.getElementById("comments").innerHTML = "";
					for (var i = 0; i < data.Comments.length; i++) {
						let userid = data.Comments[i].userId;
						let username = data.Comments[i].userName;
						let id = data.Comments[i].id;
						let headline = data.Comments[i].headline;
						let comment = data.Comments[i].content;
						let votes = data.Comments[i].votes;
						console.log(username);
						displayComment(username, headline, comment, votes, id);

					}
				}
			}
			xhr.send();
		});
	}

	function displayComment(author, headline, comment, liked, id) {
		var div = document.createElement("DIV");
		div.id = "comment" + id;
		div.classList.add("comment");
		document.getElementById("comments").appendChild(div);

		var title = document.createElement("DIV");
		title.innerHTML = headline;
		title.classList.add("commentTitle");
		div.appendChild(title);

		var userName = document.createElement("DIV");
		userName.innerHTML = author;
		userName.classList.add("commentUser");
		div.appendChild(userName);

		var content = document.createElement("DIV");
		content.innerHTML = comment;
		content.classList.add("commentContent");
		div.appendChild(content);
	}

	function writeComment() {
		var comment = document.getElementById("inputContent").value;
		var title = document.getElementById("inputTitle").value;

		if (comment == "" || title == ""){
			alert("Fehler!");
		} else {
			chrome.tabs.query({
				currentWindow: true,
				active: true
			}, function(tabs) {
				var url = tabs[0].url;
				var xhr = new XMLHttpRequest();
				xhr.open("POST", "http://" + ipAdress + "/comments/", true);
				xhr.onload = function() {
					console.log(this.responseText);
					console.log(this.status);
					if (this.status === 201)
						alert("yeah");
				}				
				xhr.send(JSON.stringify({
					userName: userName,
					password: password,
					headline: title,
					comment: comment,
					url: url
				}));
			});
		}
	}

	function getUserData() {
		chrome.storage.local.get(["userName", "password", "time"], function(result){
			var date = new Date();
			if (result.time > date.getTime()) {
				alert("yeah");
			} else {
				chrome.storage.local.set({
					userName: undefined,
					password: undefined,
					time: undefined
				}, function(){
					window.location.href = "../../HTML/login/login.html";
				});
			}
		});
	}
	getUserData();
	refresh();
	setInterval(refresh, 50000);
});