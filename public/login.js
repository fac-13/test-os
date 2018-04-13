const form = document.getElementsByClassName("login__form")[0];
const username = document.getElementById('username');
const password = document.getElementById('password');
const loginButton = document.getElementById('loginButton');
const error =document.querySelector(".error");

form.addEventListener("submit", function(event) {

  if (password.validity.valueMissing || confirmPassword.validity.valueMissing) {
    error.innerText = "Please enter a password";
    event.preventDefault();
  }

  if (
    password.validity.patternMismatch ||
    confirmPassword.validity.patternMismatch
  ) {
    error.innerText =
      "Password must contain at least eight characters, including one letter and one number";
    event.preventDefault();
  }

});
