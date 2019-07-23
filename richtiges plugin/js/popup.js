document.addEventListener("DOMContentLoaded", function() {
  const ipAdress = "192.168.2.105";
  document.getElementById("btnCreateComment").addEventListener("click", () => {
    if (document.getElementById("btnCreateComment").textContent == "Zurück")
      document.getElementById("btnCreateComment").textContent = "Kommentar erstellen";
    else if (document.getElementById("btnCreateComment").textContent == "Kommentar erstellen")
      document.getElementById("btnCreateComment").textContent = "Zurück";
  });
});
