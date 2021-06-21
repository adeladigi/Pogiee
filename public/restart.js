const homeButton = document.getElementById("home-btn");
const logout = document.getElementById("logout-btn");

homeButton.addEventListener("click",function(){
  window.location.href = "/";
});

logout.addEventListener("click",function(){
  window.location.href = "/logout";
});
