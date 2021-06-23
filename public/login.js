
const signUpButton = document.getElementById("sign-up-btn");
const logo = document.getElementById("logo-btn");

signUpButton.addEventListener("click",function(){
  window.location.href = "/register";
});

logo.addEventListener("click",function(){
  window.location.href = "/";
});


const errMessage = document.querySelector(".failed-login-box");;



if( errMessage.length === ""){
    // do nothing
  }else{
    //background-color: #eec4c4;
      errMessage.style.visibility = "visible";
    }
