document.addEventListener("DOMContentLoaded", function() {
  function getDesign() {
    var design = localStorage.getItem("design");
    console.log(design);
    if (typeof design == "undefined" || design == "light" || design == null)
      loadjscssfile("CSS/design/light.css", "css");
    else if (design == "dark")
      loadjscssfile("CSS/design/dark.css", "css");
  }

  function loadjscssfile(filename, filetype) {
    if (filetype == "js") { //if filename is a external JavaScript file
      // alert('called');
      var fileref = document.createElement('script')
      fileref.setAttribute("type", "text/javascript")
      fileref.setAttribute("src", filename)
    } else if (filetype == "css") { //if filename is an external CSS file
      var fileref = document.createElement("link")
      fileref.setAttribute("rel", "stylesheet")
      fileref.setAttribute("type", "text/css")
      fileref.setAttribute("href", filename)
    }
    if (typeof fileref != "undefined")
      document.getElementsByTagName("head")[0].appendChild(fileref)
  }

  getDesign();
});
