document.addEventListener("DOMContentLoaded", function(){
    document.getElementById("createAcc").addEventListener("click", createAcc);
    
    var ipAdress = "192.168.5.62";
    
    function createAcc() {
        window.location.href = "signup.html";
    }
    
    function getXhrData(data, synch) {
        var xhr = new XMLHttpRequest();
        xhr.open("GET", "http://" + ipAdress + data, synch);
        xhr.onload = function() {
            if (this.status === 200) {
                return this.resoponseText;
            }
        }
        xhr.send();
    }
    
    function setTopComments() {
        var data = JSON.parse(getXhrData("/comments/top/", true));
        console.log(data);
        
    }
    
    function setTopWebsites() {
        var data = JSON.parse(getXhrData("/sites/top/", true));
        
    }
});