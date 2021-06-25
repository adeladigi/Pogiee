

const loginButton = document.getElementById("log");
const logo = document.getElementById("logo-btn");

loginButton.addEventListener("click",function(){
  window.location.href = "/login";
});

logo.addEventListener("click",function(){
  window.location.href = "/";
});



// form validation
const form = document.querySelector("form");
const errorMessage = document.getElementById("error-message");
const password = document.getElementById("exampleInputPassword1");
const stripe = document.getElementById("strip-s");


form.addEventListener("submit",function(e){
  let messages = [];

  errorMessage.innerHTML = messages;

  if(password.value.length <= 6){
    messages.push("Password must be longer then 6 characters");
  }


  if(password.value.length >= 20) {
    messages.push("Password must not be longer then 20 characters")
  }

  if(password.value === "password" || password.value === "Password") {
    messages.push("Password can not be password");
  }


  if(messages.length > 0){
     e.preventDefault();
         
     errorMessage.innerText = messages.join(", ")
  }

});
