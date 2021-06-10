
const signUpButton = document.getElementById("sign-up-btn");
const logo = document.getElementById("logo-btn");

signUpButton.addEventListener("click",function(){
  window.location.href = "/register";
});

logo.addEventListener("click",function(){
  window.location.href = "/";
});
