

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
