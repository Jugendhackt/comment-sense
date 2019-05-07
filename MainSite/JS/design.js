document.addEventListener("DOMContentLoaded", function() {
  function getDesign() {
    var design = localStorage.getItem("design");
    console.log(design);
    if (typeof design == "undefined" || design == "light" || design == null) {
      loadjscssfile("CSS/design/light.css", "css");
      loadjscssfile("assets/icons/settingLight512.png", "png");
    } else if (design == "dark") {
      loadjscssfile("CSS/design/dark.css", "css");
      loadjscssfile("assets/icons/settingDark512.png", "png");
    }
  }

  function loadjscssfile(filename, filetype) {
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
      document.getElementById("setting").src = filename;
    }
    if (typeof fileref != "undefined")
      document.getElementsByTagName("head")[0].appendChild(fileref);
  }

  getDesign();
});
