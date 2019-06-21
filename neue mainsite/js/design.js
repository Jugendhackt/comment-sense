document.addEventListener("DOMContentLoaded", function(){

  function getDesign() {
    var design = localStorage.getItem("design");
    console.log(design);
    if (typeof design == "undefined" || design == null || design == "light") {
      if (window.location.pathname.split("/").pop() == "index.html") {
        loadjscssfile("css/design/light.css", "css");
        loadjscssfile("assets/icons/settingLight512.png", "png", "settingIcon");
        loadjscssfile("assets/icons/userLight512.png", "png", "userIcon");
      } else {
        loadjscssfile("../css/design/light.css", "css");
        loadjscssfile("../assets/icons/settingLight512.png", "png", "settingIcon");
        loadjscssfile("../assets/icons/userLight512.png", "png", "userIcon");
      }
    } else if (design == "dark"){
      if (window.location.pathname.split("/").pop() == "index.html") {
        loadjscssfile("css/design/dark.css", "css");
        loadjscssfile("assets/icons/settingDark512.png", "png", "settingIcon");
        loadjscssfile("assets/icons/userDark512.png", "png", "userIcon");
      } else {
        loadjscssfile("../css/design/dark.css", "css");
        loadjscssfile("../assets/icons/settingDark512.png", "png", "settingIcon");
        loadjscssfile("../assets/icons/userDark512.png", "png", "userIcon");
      }
    }
  }

  function loadjscssfile(filename, filetype, id) {
    if (filetype == "js") {
      var fileref = document.createElement("script");
      fileref.setAttribute("type", "text/javascript");
      fileref.setAttribute("src", filename);
    } else if (filetype == "css") {
      var fileref = document.createElement("link");
      fileref.setAttribute("rel", "stylesheet");
      fileref.setAttribute("type", "text/css");
      fileref.setAttribute("href", filename);
    } else if (filetype == "png") {
      console.log(filename);
      console.log(document.getElementById(id));
      document.getElementById(id).src = filename;
    }
    if (typeof fileref != "undefined")
      document.getElementsByTagName("head")[0].appendChild(fileref);
  }

  getDesign();
});
