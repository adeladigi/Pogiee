

const loginButton = document.getElementById("log");
const logo = document.getElementById("logo-btn");

loginButton.addEventListener("click",function(){
  window.location.href = "/first";
});

logo.addEventListener("click",function(){
  window.location.href = "/";
});
