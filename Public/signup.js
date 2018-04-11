const username = document.getElementById("username");
const password = document.getElementById("password");
const confirmPass = document.getElementById("confirm-password");

confirmPass.addEventListener('keyup',function(){
    if (this.value !== password.value){
        console.log("can't submit yet");
    } else {
        console.log("matched");
    }
    
});