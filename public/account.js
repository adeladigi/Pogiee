
//nav dropdown menu mobile
const $hambergerBtn = $("#hamberger-btn");
const $mobileDropMenu = $(".nav-dropdown-menu");

$mobileDropMenu.hide();

$hambergerBtn.click(function(){
 $mobileDropMenu.toggle();
});

// section 1 mobile drop down buttons

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

//3# logout button
const logoutBtn = document.getElementById("logout-btn");

logoutBtn.addEventListener("click",function(){
  window.location.href = "/logout";
});





//username buttons
const $userNameDropBtn = $("#username-drop-btn");
const $userNameDropMenu = $(".username-drop-menu");


$userNameDropMenu.hide();

$userNameDropBtn.click(function(){
 $userNameDropMenu.toggle();
});

//email buttons
const $emailNameDropBtn = $("#email-drop-btn");
const $emailNameDropMenu = $(".email-drop-menu");

$emailNameDropMenu.hide();

$emailNameDropBtn.click(function(){
 $emailNameDropMenu.toggle();
});

//cancel buttons
const $cancelNameDropBtn = $("#cancel-drop-btn");
const $cancelNameDropMenu = $(".cancel-drop-menu");

$cancelNameDropMenu.hide();

$cancelNameDropBtn.click(function(){
 $cancelNameDropMenu.toggle();
});

//reactivate buttons
const $reactivateNameDropBtn = $("#reactivate-drop-btn");
const $reactivateNameDropMenu = $(".reactivate-drop-menu");

$reactivateNameDropMenu.hide();

$reactivateNameDropBtn.click(function(){
 $reactivateNameDropMenu.toggle();
});
