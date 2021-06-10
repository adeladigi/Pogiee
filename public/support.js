

const $dropDownMenu = $(".drop-down-menu");
const $menuButton = $(".fa-bars");

const terms  = document.getElementById("terms-btn");
const privacy  = document.getElementById("privacy-btn");
const cookie  = document.getElementById("cookies-btn");
const backToHome = document.getElementById("back-to-home");
const about = document.getElementById("about-btn");
const logo1 = document.getElementById("logo1-btn");
const logo2 = document.getElementById("logo2-btn");

$dropDownMenu.hide();

$menuButton.click(function(){
 $dropDownMenu.toggle();
});


terms.addEventListener("click",function(){
  window.location.href = "/terms";
});

privacy.addEventListener("click",function(){
  window.location.href = "/privacy";
});

cookie.addEventListener("click", function(){
  window.location.href = "/cookies";
});

backToHome.addEventListener("click", function(){
  window.location.href = "/";
});

about.addEventListener("click", function(){
  window.location.href = "/about";
});

logo1.addEventListener("click", function(){
  window.location.href = "/";
});

logo2.addEventListener("click", function(){
  window.location.href = "/";
});
