

// Logo button
const logoBtn = document.getElementById("logo-btn");

logoBtn.addEventListener("click",function(){
  window.location.href = "/";
});

// drop dwon menu
const $dropMenuBtn = $("#drop-menu-btn");
const $dropMenuBox = $(".drop-down-menu");

$dropMenuBox.hide();

 $dropMenuBtn.click(function(){
$dropMenuBox.toggle();
});

// drop menu buttons

//1# Sign up button
const signUpBtn = document.getElementById("signup-btn");

signUpBtn.addEventListener("click",function(){
  window.location.href = "/register";
});

// 2# Log in button
const logInBtn = document.getElementById("login-btn");

logInBtn.addEventListener("click",function(){
  window.location.href = "/first";
});


const aboutBtn = document.getElementById("about-btn");

aboutBtn.addEventListener("click",function(){
  window.location.href = "/about";
});








// 1# Qusetion setup
const $question1Btn = $("#question1-btn");

const $answer1Box = $("#answer1-box");

$answer1Box.hide();

$question1Btn.click(function(){
 $answer1Box.toggle();
});

// 2# Qusetion setup
const $question2Btn = $("#question2-btn");

const $answer2Box = $("#answer2-box");

$answer2Box.hide();

$question2Btn.click(function(){
 $answer2Box.toggle();
});

// 3# Qusetion setup
const $question3Btn = $("#question3-btn");

const $answer3Box = $("#answer3-box");

$answer3Box.hide();

$question3Btn.click(function(){
 $answer3Box.toggle();
});

// 4# Qusetion setup
const $question4Btn = $("#question4-btn");

const $answer4Box = $("#answer4-box");

$answer4Box.hide();

$question4Btn.click(function(){
 $answer4Box.toggle();
});


// 5# Qusetion setup
const $question5Btn = $("#question5-btn");

const $answer5Box = $("#answer5-box");

$answer5Box.hide();

$question5Btn.click(function(){
 $answer5Box.toggle();
});

// 6# Qusetion setup
const $question6Btn = $("#question6-btn");

const $answer6Box = $("#answer6-box");

$answer6Box.hide();

$question6Btn.click(function(){
 $answer6Box.toggle();
});
