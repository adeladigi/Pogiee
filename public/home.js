

const regButton = document.getElementById("reg");
const loginButton = document.getElementById("log");
const loginButton2 = document.getElementById("log2");
const menuButton = document.getElementById("menu-btn");
const dropDownAboutBtn = document.getElementById("about-btn");
const logo1 = document.getElementById("logo1-btn");
const logo2 = document.getElementById("logo2-btn");



const supportButton = document.getElementById("support-btn")

let $dropDownMenu = $(".drop-down-menu");

$dropDownMenu.hide();



regButton.addEventListener("click",function(){
  window.location.href = "/register";
});

loginButton.addEventListener("click",function(){
  window.location.href = "/first";
});

loginButton2.addEventListener("click",function(){
  window.location.href = "/first";
});

menuButton.addEventListener("click",function(){
  $dropDownMenu.toggle();
});

supportButton.addEventListener("click", function(){
  window.location.href = "/support";
});

dropDownAboutBtn.addEventListener("click", function(){
  window.location.href = "/about";
});

logo1.addEventListener("click",function(){
  window.location.href = "/";
});

logo2.addEventListener("click",function(){
  window.location.href = "/";
});
