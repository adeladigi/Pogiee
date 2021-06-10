// hamberger menu button
let $dropDownMenu = $(".drop-down-menu");
let $hambergerBtn = $("#hamberger-menu");
$dropDownMenu.hide();

$hambergerBtn.click(function(){
 $dropDownMenu.toggle();
});



// join button
const  joinBtn = document.getElementById("join-btn");

joinBtn.addEventListener("click",function(){
  window.location.href = "/register";
});



//1# support button
const supportBtn = document.getElementById("support-btn");

supportBtn.addEventListener("click",function(){
  window.location.href = "/support";
});

//2# terms button
const termsBtn = document.getElementById("terms-btn");

termsBtn.addEventListener("click",function(){
  window.location.href = "/terms";
});

//3# privacy button
const privacyBtn = document.getElementById("privacy-btn");

privacyBtn.addEventListener("click",function(){
  window.location.href = "/privacy";
});

// 4# cookies button
const cookiesBtn = document.getElementById("cookies-btn");

cookiesBtn.addEventListener("click",function(){
  window.location.href = "/cookies";
});
