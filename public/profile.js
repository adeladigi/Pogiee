

// section 1# hamberger menu button

let $dropDownMenu = $(".drop-down-menu");
let $settingIcon = $(".fa-cog");

$dropDownMenu.hide();


$settingIcon.click(function(){
  $dropDownMenu.toggle();
});

// sectrion 2#  drop down menu buttons

const accountBtn = document.getElementById("account-btn");

accountBtn.addEventListener("click",function(){
  window.location.href = "/account";
});

const logoutBtn = document.getElementById("logout-btn");

logoutBtn.addEventListener("click",function(){
  window.location.href = "/logout";
});


// section 3# desktop buttons
const desktopBackBtn = document.getElementById("desktop-back-btn");
const desktopAccountBtn = document.getElementById("desktop-account-btn");
const desktoplogoutBtn = document.getElementById("desktop-logout-btn");

desktopBackBtn.addEventListener("click",function(){
  window.location.href = "/game";
});

desktopAccountBtn.addEventListener("click",function(){
  window.location.href = "/account";
});

desktoplogoutBtn.addEventListener("click",function(){
  window.location.href = "/logout";
});


// section 4#
const titterBtn = document.getElementById("titter-btn");
const instagramBtn = document.getElementById("instagram-btn");
const facebookBtn = document.getElementById("facebook-btn");

titterBtn.addEventListener("click",function(){
  window.location.href = "https://twitter.com/Pogiee3";
});

instagramBtn.addEventListener("click",function(){
  window.location.href = "https://www.instagram.com/pogiee_games/";
});

facebookBtn.addEventListener("click",function(){
  window.location.href = "https://www.facebook.com/Pogiee-109822717993232/";
});





let currentPoints = document.getElementById("points").innerHTML;
let pNFL = document.getElementById("next").innerHTML;
let nextLevelName = document.getElementById("nextName").innerHTML;

let bageNumber = pNFL - currentPoints;


// Chart1
let labels1 = ["Till "+nextLevelName, "Total points"];
let data1 = [bageNumber, currentPoints];
let colors1 = ['#36CAAB',"#fed049"];


let myChart1 = document.getElementById("myChart").getContext('2d');

let chart1 = new Chart(myChart1, {
  type: 'doughnut',
  data: {
      labels: labels1,
      datasets: [{
        data: data1,
        backgroundColor: colors1,
      }]
  },
  options: {
      title: {
        text: "Do you doughnuts?",
        display: true
      }
  }


});
