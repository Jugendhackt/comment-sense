document.addEventListener("DOMContentLoaded", function(){
    document.getElementById("button-save").addEventListener("click", sendsaveData);
    document.getElementById("button-clear").addEventListener("click", clearData);

    var ipAdress = '192.168.5.163'

    var error = document.getElementById("error");
    var inputUsername = document.getElementById("inputUsername");
    var inputPassword = document.getElementById("inputPassword");

    function sendsaveData(){
        var username = inputUsername.value;
        var password = inputPassword.value;
        if(username == "" || password == ""){
            error.innerHTML = "Es sind nicht alle Felder ausgefüllt!";
        } else {
            error.innerHTML = "";

            var xhr = new XMLHttpRequest();
            xhr.open("POST", "http://" + ipAdress + "/users/create/", true);
            xhr.onload = function(){
                if (this.status === 200){
                    var data = JSON.parse(this.responseText);
                    console.log("hi");
                }

            }
            xhr.send(JSON.stringify({userName: username, password: password}));
        }
    }

    function clearData(){
        error.innerHTML = "";
        inputUsername.value = "";
        inputPassword.value = "";
    }
});
