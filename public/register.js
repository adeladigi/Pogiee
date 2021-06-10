

const loginButton = document.getElementById("log");
const logo = document.getElementById("logo-btn");

loginButton.addEventListener("click",function(){
  window.location.href = "/login";
});

logo.addEventListener("click",function(){
  window.location.href = "/";
});
