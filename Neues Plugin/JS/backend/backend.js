document.addEventListener("DOMContentLoaded", function() {
	document.getElementById("send").addEventListener("click", writeComment);


	const ipAdress = "192.168.178.34";

	function refresh() {
		chrome.tabs.query({
			currentWindow: true,
			active: true
		}, function(tabs){
			var url = tabs[0].url;
			var xhr = new XMLHttpRequest();
			xhr.open("GET", "http://" + ipAdress + "/comments/site='" + url + "'", true);
			xhr.onload = function() {
				if (this.status === 200 || this.status === 404) {
					console.log(this.responseText);
					var data = JSON.parse(this.responseText);
					document.getElementById("comments").innerHTML = "";
					for (var i = 0; i < data.comments.length; i++) {
						let userid = data.comments[i].userId;
						let username = data.comments[i].userName;
						let id = data.comments[i].id;
						let headline = data.comments[i].headline;
						console.log(data.comments[i]);
						let comment = data.comments[i].content;
						let votes = data.comments[i].votes;
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

		var votes = document.createElement("DIV");
		votes.id = "votes" + id;
		votes.classList.add("votes");
		votes.innerHTML = liked + " Likes";
		div.appendChild(votes);

		var button = document.createElement("BUTTON");
		button.id = "button" + id;
		button.innerHTML = "Gefällt mir";
		button.classList.add("like");
		button.classList.add("button");
		div.appendChild(button);

		console.log(button);

		button.addEventListener("click", function(){
			like(id, title);
		});
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
				chrome.storage.local.get(["userName", "password"], function(result){
					var xhr = new XMLHttpRequest();
					xhr.open("POST", "http://" + ipAdress + "/comments/", true);
					xhr.onload = function() {
						console.log(this.responseText);
						console.log(this.status);
						if (this.status === 201) {
							changeDisplay("commentInput", "none");
							changeDisplay("createCommentDiv", "block");
							changeHeight("footer", "40px");
						}
					}
					xhr.send(JSON.stringify({
						userName: result.userName,
						password: result.password,
						headline: title,
						content: comment,
						url: url
					}));
				});
			});
		}
	}

	function changeDisplay(id, display) {
		document.getElementById(id).style.display = display;
	}

	function changeHeight(id, height) {
		document.getElementById(id).style.height = height;
	}

	function like(id, headline) {
		chrome.storage.local.get(["userName", "password"], function(result){
			var xhr = new XMLHttpRequest();
			xhr.open("PATCH", "http://" + ipAdress + "/comments/vote", true);
			xhr.onload = function() {
				//var data = JSON.parse(this.responseText);
				console.log(this.responseText);
			}
			xhr.send(JSON.stringify({
				id: id,
				userName: result.userName,
				password: result.password,
				vote: 1
			}));
		});

	}
	refresh();
	setInterval(refresh, 5000);
});
