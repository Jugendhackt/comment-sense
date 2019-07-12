document.addEventListener("DOMContentLoaded", function() {
  document.getElementById("btnCreateComment").addEventListener("click", () => {
    if (document.getElementById("btnCreateComment").textContent == "Zurück")
      document.getElementById("btnCreateComment").textContent = "Kommentar erstellen";
    else if (document.getElementById("btnCreateComment").textContent == "Kommentar erstellen")
      document.getElementById("btnCreateComment").textContent = "Zurück";
  });
});
