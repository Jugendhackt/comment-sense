document.addEventListener("DOMContentLoaded", function(){
  document.getElementById("aLogin").addEventListener("click", function(){
    bootbox.dialog({
      title: "Anmelden",
      size: "lg",
      message: "<form><div class='form-group'><label>Nickname:</label><input class='form-control'></div><div class='form-group'><label>Password:</label><input class='form-control'></div></form>",
      buttons: {
        confirm: {
          label: "Anmelden",
          className: "btn-primary",
          callback: function(){

          }
        },
        cancel: {
          label: "Schließen",
          className: "btn-danger",
          callback: function() {

          }
        }
      }
    });
  });
});
