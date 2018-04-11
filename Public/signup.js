const username = document.getElementById("username");
const password = document.getElementById("password");
const confirmPass = document.getElementById("confirm-password");
const submit = document.getElementById("submit");
const form = document.getElementById("signup-form");
submit.disabled = true;

form.addEventListener('keyup',function(){
    if (confirmPass.value !== password.value || validatePass(password.value) || username.value.length === 0){
        submit.disabled = true;
        console.log("can't submit yet");
    } else {
        console.log("matched");
        submit.disabled = false;
    }
    
});

function validatePass(value) {
    const pattern="(?=.*\d)(?=.*[a-z])(?=.*[!$%&(-/:-?_{}~])(?=.*[A-Z]).{9,}";
    const regex = new RegExp(pattern);
    console.log(regex.test(value));
    return regex.test(value);
}