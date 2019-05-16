document.addEventListener("DOMContentLoaded", function() {
	document.getElementById("createAcc").addEventListener("click", function() {
		window.location.href = "signup.html";
	});
	document.getElementById("setting").addEventListener("click", function() {
		createModalBox();
	});

	const ipAdress = "192.168.2.110";

	function setTopComments() {
		var xhr = new XMLHttpRequest();
		xhr.open("GET", "http://" + ipAdress + "/comments/top/", true);
		xhr.onload = function() {
			console.log(this.responseText);
			if (this.status === 200) {
				var data = JSON.parse(this.responseText);

				for (var i = 0; i < 4; i++) {
					document.getElementById("link" + i).href = data[i];
					console.log(i);
				}
			}
		}
		xhr.send();
	}

	function setTopWebsites() {
		var xhr = new XMLHttpRequest();
		xhr.open("GET", "http://" + ipAdress + "/sites/top/", true);
		xhr.onload = function() {
			if (this.status === 200)
				var data = JSON.parse(this.responseText);
			console.log(data.sites[0]);

			var div = document.createElement("div");
			div.id = "topWebsites";
			document.getElementById("topWebsitesContainer").appendChild(div);

			var headerWebsites = document.createElement("label");
			headerWebsites.textContent = "Top Websites";
			headerWebsites.id = "headerWebsites";
			headerWebsites.classList.add("headerWebsites");
			div.appendChild(headerWebsites);

			for (var i = 0; i < data.sites.length; i++){
				var contentDiv = document.createElement("div");
				contentDiv.id = "topWebsite" + i;
				contentDiv.classList.add("topWebsite");
				div.appendChild(contentDiv);

				var titleDiv = document.createElement("div");
				titleDiv.id = "titleDiv" + i;
				titleDiv.classList.add("title");

				if (data.sites[i].url.substring(0, 7) == "http://")
					titleDiv.textContent = data.sites[i].url.substring(7, data.sites[i].url.length);
				else 
					titleDiv.textContent = data.sites[i].url.substring(8, data.sites[i].url.length);

				contentDiv.appendChild(titleDiv);


				var btnDiv = document.createElement("div");
				btnDiv.id = "btnDiv" + i;
				btnDiv.classList.add("btnDiv");
				contentDiv.appendChild(btnDiv);

				var btn = document.createElement("button");
				btn.id = "btnVisitWebsite" + i;
				btn.classList.add("button");
				btn.classList.add("visitWebsite");
				btn.textContent = "Zur Website wechseln";
				console.log(data.sites[i].url);
				btn.addEventListener("click", function(){
					var id = this.id.substring(15, this.id.length);
					visitWebsite(data.sites[id].url);
				});
				btnDiv.appendChild(btn);
			}
		}
		xhr.send();

	}

	setTopWebsites();
	
	function visitWebsite(url){
		window.location.href = url;
	}

	function createModalBox() {
		if (document.getElementById("modal") == null) {
			var design = localStorage.getItem("design");
			var modal = document.createElement("DIV");
			modal.id = "modal";

			if (design == null || design == "light")
				modal.style.backgroundColor = "lightgray";
			else if (design == "dark")
				modal.style.backgroundColor = "black";
			modal.classList.add("modal");
			modal.style.height = "500px";
			modal.style.width = "100vw";

			var label = document.createElement("LABEL");
			label.classList.add("label");
			label.textContent = "Design auswählen";
			modal.appendChild(label);

			var comboBox = document.createElement("SELECT");
			comboBox.id = "design";
			comboBox.classList.add("select");

			var light = document.createElement("OPTION");
			light.appendChild(document.createTextNode("hell"));
			light.value = "light";
			light.classList.add("option");
			comboBox.appendChild(light);

			var dark = document.createElement("OPTION");
			dark.appendChild(document.createTextNode("dunkel"));
			dark.value = "dark";
			dark.classList.add("option");
			comboBox.appendChild(dark);

			modal.appendChild(comboBox);

			if (design == null || design == "light")
				comboBox.selectedIndex = 0;
			else
				comboBox.selectedIndex = 1;

			var button = document.createElement("BUTTON");
			button.id = "save";
			button.textContent = "Speichern";
			button.classList.add("button");
			modal.appendChild(button);
			document.body.appendChild(modal);
			document.getElementById("save").addEventListener("click", function() {
				localStorage.setItem("design", document.getElementById("design").value);
				window.location.reload();
			});

			window.onclick = function(event) {
				if (event.target.id != "save" && event.target.id != "setting") {
					modal.remove();
				}
			}

			modal.style.display = "flex";
		}
	}
	//setTopComments();
});
