
//charts button desktop
var chartBtn = document.getElementById("desktop-charts-btn");

chartBtn.addEventListener("click", function(){
   //window.location.href = "/game";
   alert("Coming soon!");
});

//charts button desktop
var mobileChartBtn = document.getElementById("mobile-charts-btn");

mobileChartBtn.addEventListener("click", function(){
   //window.location.href = "/game";
   alert("Coming soon!");
});


const soundButton = document.querySelector(".sound-icon");


var startGame = false;
var levelCount = 1;
var currentLevel = "Level: " + levelCount;
var h1Saying = document.getElementById("h1-saying");
var wordDefinition = document.getElementById("definition-saying");
var h2Saying = document.querySelector("h2");
var $correctH2 = $("#correct-way")
var $wrongH2 = $("#wrong-way")
var creation = 0;
var startButton = document.getElementById("pressPlay");
var submitButton = document.getElementById("answerButton");

var playAgain = document.getElementById("playAgain-btn");

var pointsDisplay = document.getElementById("points-display");
var missedWords = document.getElementById("missed-words-display");
var capturedWords = document.getElementById("words-Captured-display");

// hide mode desktop variables
var hideModeBtn = document.getElementById("mode-desktop-btn");

var $hideStatus = $("#hide-status");

//hide mode mobile variables
var hideModeMobileBtn = document.getElementById("mode-mobile-btn");
//var hideStatus = document.getElementById("hide-status");
var $hideMobileStatus = $("#hide-mobile-status");

var points =  0;
var wrongWords = 0;


// difficulty vaules
var easyValue = document.getElementById("easy-setting-value").value;
var normalValue = document.getElementById("normal-setting-value").value;
var hardValue = document.getElementById("hard-setting-value").value;

// setting level difficulty
if(easyValue === "true" && normalValue === "false" && hardValue === "false"){

  // difficulty modes
  var easyMode = true;
  var normalMode = false;
  var hardMode = false;

}else if(easyValue === "false" && normalValue === "true" && hardValue === "false"){

  // difficulty modes
  var easyMode = false;
  var normalMode = true;
  var hardMode = false;

}else if(easyValue === "false" && normalValue === "false" && hardValue === "true"){

  // difficulty modes
  var easyMode = false;
  var normalMode = false;
  var hardMode = true;
}else{
  console.log("error with difficulty settings");
}


// checking hide mode setting
var settingString = document.getElementById("mode-setting-value").value;

if(settingString === "false"){
  // game mode
  var hideMode = false;
}else if (settingString === "true"){
  // game mode
  var hideMode = true;
}


var wrongAnswerFlag = false;


// menus on mobile
var $dropDownMenu = $(".drop-down-div");
var $hamMenu = $(".fa-bars")
var $settingsMenu = $(".settings-menu");
var $settingsButton = $("#settting-button");

// tablet and desktop menus
var $desktopSettings = $(".desktop-menu");
var $dtSetBtn = $("#desktop-settings-btn");
var $lobbyBtn = $("fa-user");

// level buttons moblie
var $easyButton = $("#easy-btn");
var $normalButton = $("#normal-btn");
var $hardButton = $("#hard-btn");

// level buttons tablet / desktop
var $deskEasyBtn = $("#easy-desktop-btn");
var $deskNoramlBtn = $("#normal-desktop-btn");
var $deskHardBtn = $("#hard-desktop-btn");


//hidding menus
$dropDownMenu.hide();
$settingsMenu.hide();
$desktopSettings.hide();


// check level status mobile
checkLevelStatusMobile();

// check tablet/ desktop
checkLevelStatusDesktop();

// check mode status Desktop
checkModeStatusDesktop();

// check mode status Mobile
checkModeStatusMobile();



var normalList = ["consent", "elicit", "authentic", "collusion", "acceptance", "apprehensive", "autonomy", "dogged", "evade",
"adversary", "attentive", "banish", "barricade", "addictive", "commotion", "conspicuous", "counter", "cunning", "debris",
"defiance", "destination", "diminish", "emerge", "ember", "foresight", "fragrance", "grueling", "habitation", "ignite", "jargon", "luminous",
"momentum", "multitude", "lullaby", "reckoning", "zealous", "resin", "mayonnaise", "shrunken", "season", "brainstorm", "culture", "drastic",
"envious", "extinction", "gasoline", "fraction", "government", "hazardous", "interview", "library", "material", "mathematics", "encouraging",
"economic", "proscribe", "remiss", "calamity", "dumbbell","cemetery", "weird", "harass", "eureka", "hobnob", "nemesis", "aloft", "debunk",
"mature", "conjecture", "scrimp", "ungainly", "endorse", "entail", "eradicate", "truncate", "tumult", "abet", "corollary", "excavate", "exonerate",
"shrewd", "wallop", "affinity", "diffuse", "ensue", "guardian", "influx", "longevity", "ordinary", "acerbic", "yeoman", "demure", "insipid", "glib", "cogent", "paragon", "affable",
"levity", "placid", "vapid", "nadir", "tenuous", "abase", "surly", "stolid", "canard", "fervid", "apathy", "zealot", "lucid", "intrepid", "clemency", "deft", "obviate"];


var easyList = ["call", "air", "also", "both", "family", "after", "any", "dish", "clock", "around", "barn", "back", "cold", "animal", "always",
"bath", "ask", "boat", "been", "each", "buy", "clean", "fast", "dress", "feed", "best", "cannot", "before", "because", "deer", "drop", "every",
"friend", "found", "first", "fight", "gave", "give", "goat", "good", "happy", "help","here", "high", "him", "home", "house", "jump", "just", "kind",
"drum", "kiss", "large", "light", "line", "lion", "list", "little", "lock", "long", "look", "loud", "lunch", "made", "mess", "might", "most", "much",
"must", "new", "night", "nine", "now", "off", "only", "or", "our", "out", "out", "path", "place", "plus", "pool", "put", "rabbit", "read", "rest",
"right", "rock", "said", "sea", "second", "seem", "send", "seven", "shape", "sight", "silly", "sing", "sister", "slid", "sound", "stamp", "state",
"still","stone", "such", "take", "tell", "thing", "ton", "treat", "trick", "tune", "under", "use", " very", "wash", "well", "went", "yard", "year",
 "done", "lab", "the", "down", "are", "car", "she", "why", "at", "all", "what", "was", "with", "which", "each", "these", "would", "from",
"water", "many", "other", "look", "number", "part", "write", "have", "turn", "came", "over", "know", "live", "try", "great", "study", "move", "world", "boon"];



  var hardList = ["surveillance", "chauffeur", "misspell", "intelligence", "pronunciation", "handkerchief", "questionnaire", "unconscious", "precocious", "idiosyncrasy",
"conscientious", "necessary", "bouillon", "encumber", "holistic", "incongruous", "aberration", "abjure", "abrogate", "abstruse", "admonish", "ambivalent", "amenable","apathetic",
"antithesis", "assiduous", "beguile", "capitulate", "demagogue", "denigrate", "diaphanous", "didactic", "disrepute", "ebullient", "egregious", "emollient","fatuous", "impetuous",
"Sacrilegious", "fallacious", "forbearance", "crescendo", "irresistible", "millennium", "inoculate", "supersede", "minuscule", "embarrass", "occurrence", "amorphous", "facetious",
"equivocal", "redolent", "stratagem", "aplomb", "evangelical", "palatable", "salubrious", "ameliorate", "ineffable", "desultory", "meretricious", "malinger", "diffident", "reticent",
 "irascible", "mendacious","elucidate", "prevaricate", "specious", "esoteric", "lugubrious", "prattle", "neophyte", "despondent",  "blithe", "taciturn", "pertinacious", "compunction",
 "pulchritude", "stentorian", "forlorn", "loquacious","perfidious", "intransigent", "innocuous", "invective", "circumlocution", "ruminate", "calumny", "ignominious", "serendipity", "pusillanimous",
  "raconteur", "impertinent", "repudiate", "lachrymose",  "arcane", "anachronism", "abnegation", "clairvoyant", "somnolent", "astute", "nettle", "soporific", "inculcate", "sycophant", "invidious",
  "quotidian", "sagacious", "ennui", "ethereal", "sanguine", "peripatetic", "impecunious", "obsequious", "temerity", "indolent", "prosaic", "saccharine", "inexorable", "obstreperous", "sentient",
   "phlegmatic", "prurient", "vociferous", "truculent", "ephemeral", "imperious", "amorous", "officious", "presumptuous", "felicitous", "equanimity", "peccadillo"];




var numberList = [];

var secDiv = document.querySelector("div#sec");
var thirdDiv = document.querySelector("div#third");

var correctWords = 0;
var wrongWords = 0;
var randomWord;


hiddenButtons = document.getElementsByClassName("hide1");


// Desktop
hideModeBtn.addEventListener("click", function() {

if(hideMode === false){
   hideMode = true;
   SetHidemode("on");
   $hideStatus.text("ON")
   $hideStatus.css("color", "#29bb89")
}else if(hideMode === true){
   hideMode = false;
   SetHidemode("off");
   $hideStatus.text("OFF")
   $hideStatus.css("color", "#fff")
}

// check mode status Desktop
checkModeStatusDesktop();

// check mode status Mobile
checkModeStatusMobile();


});

// Mobile
 hideModeMobileBtn.addEventListener("click", function() {

if(hideMode === false){
   hideMode = true;
   SetHidemode("on");
   $hideMobileStatus.text("ON")
   $hideMobileStatus.css("color", "#29bb89")
}else if(hideMode === true){
   hideMode = false;
   SetHidemode("off");
   $hideMobileStatus.text("OFF")
   $hideMobileStatus.css("color", "#fff")
}

// check mode status Desktop
checkModeStatusDesktop();

// check mode status Mobile
checkModeStatusMobile();


});



startButton.addEventListener("click", function() {

  // changing visibility
  document.getElementById("pressPlay").style.cssText = "visibility: hidden;";
  document.getElementById("answerButton").style.cssText = "visibility: visible;";
  document.getElementById("inputBox").style.cssText = "visibility: visible;";
  document.getElementById("sound-icon").style.cssText = "visibility: visible;";

  startGame = true;

  var audioStart = new Audio('sounds/start1.wav');
  audioStart.play();
  playGame();
});

playAgain.addEventListener("click", function() {
    playAgain.style.cssText = "visibility: hidden;";
    document.getElementById("answerButton").style.cssText = "visibility: visible;";
    document.getElementById("inputBox").style.cssText = "visibility: visible;";
    document.getElementById("sound-icon").style.cssText = "visibility: visible;";


    var normalList = ["consent", "elicit", "authentic", "collusion", "acceptance", "apprehensive", "autonomy", "dogged", "evade",
"adversary", "attentive", "banish", "barricade", "addictive", "commotion", "conspicuous", "counter", "cunning", "debris",
"defiance", "destination", "diminish", "emerge", "ember", "foresight", "fragrance", "grueling", "habitation", "ignite", "jargon", "luminous",
 "momentum", "multitude", "lullaby", "reckoning", "zealous", "resin", "mayonnaise", "shrunken", "season", "brainstorm", "culture", "drastic",
 "envious", "extinction", "gasoline", "fraction", "government", "hazardous", "interview", "library", "material", "mathematics", "encouraging",
"economic", "proscribe", "remiss", "calamity", "dumbbell","cemetery", "weird", "harass", "eureka", "hobnob", "nemesis", "aloft", "debunk",
 "mature", "conjecture", "scrimp", "ungainly", "endorse", "entail", "eradicate", "truncate", "tumult", "abet", "corollary", "excavate", "exonerate",
  "shrewd", "wallop", "affinity", "diffuse", "ensue", "guardian", "influx", "longevity", "ordinary", "acerbic", "yeoman", "demure", "insipid", "glib", "cogent", "paragon", "affable",
 "levity", "placid", "vapid", "nadir", "tenuous", "abase", "surly", "stolid", "canard", "fervid", "apathy", "zealot", "lucid", "intrepid", "clemency", "deft", "obviate"];



 var easyList = ["call", "air", "also", "both", "family", "after", "any", "dish", "clock", "around", "barn", "back", "cold", "animal", "always",
 "bath", "ask", "boat", "been", "each", "buy", "clean", "fast", "dress", "feed", "best", "cannot", "before", "because", "deer", "drop", "every",
 "friend", "found", "first", "fight", "gave", "give", "goat", "good", "happy", "help","here", "high", "him", "home", "house", "jump", "just", "kind",
 "drum", "kiss", "large", "light", "line", "lion", "list", "little", "lock", "long", "look", "loud", "lunch", "made", "mess", "might", "most", "much",
 "must", "new", "night", "nine", "now", "off", "only", "or", "our", "out", "out", "path", "place", "plus", "pool", "put", "rabbit", "read", "rest",
 "right", "rock", "said", "sea", "second", "seem", "send", "seven", "shape", "sight", "silly", "sing", "sister", "slid", "sound", "stamp", "state",
 "still","stone", "such", "take", "tell", "thing", "ton", "treat", "trick", "tune", "under", "use", " very", "wash", "well", "went", "yard", "year",
  "done", "lab", "the", "down", "are", "car", "she", "why", "at", "all", "what", "was", "with", "which", "each", "these", "would", "from",
 "water", "many", "other", "look", "number", "part", "write", "have", "turn", "came", "over", "know", "live", "try", "great", "study", "move", "world", "boon"];



      var hardList = ["surveillance", "chauffeur", "misspell", "intelligence", "pronunciation", "handkerchief", "questionnaire", "unconscious", "precocious", "idiosyncrasy",
 "conscientious", "necessary", "bouillon", "encumber", "holistic", "incongruous", "aberration", "abjure", "abrogate", "abstruse", "admonish", "ambivalent", "amenable","apathetic",
  "antithesis", "assiduous", "beguile", "capitulate", "demagogue", "denigrate", "diaphanous", "didactic", "disrepute", "ebullient", "egregious", "emollient","fatuous", "impetuous",
   "Sacrilegious", "fallacious", "forbearance", "crescendo", "irresistible", "millennium", "inoculate", "supersede", "minuscule", "embarrass", "occurrence", "amorphous", "facetious",
    "equivocal", "redolent", "stratagem", "aplomb", "evangelical", "palatable", "salubrious", "ameliorate", "ineffable", "desultory", "meretricious", "malinger", "diffident", "reticent",
     "irascible", "mendacious","elucidate", "prevaricate", "specious", "esoteric", "lugubrious", "prattle", "neophyte", "despondent",  "blithe", "taciturn", "pertinacious", "compunction",
     "pulchritude", "stentorian", "forlorn", "loquacious","perfidious", "intransigent", "innocuous", "invective", "circumlocution", "ruminate", "calumny", "ignominious", "serendipity", "pusillanimous",
      "raconteur", "impertinent", "repudiate", "lachrymose",  "arcane", "anachronism", "abnegation", "clairvoyant", "somnolent", "astute", "nettle", "soporific", "inculcate", "sycophant", "invidious",
      "quotidian", "sagacious", "ennui", "ethereal", "sanguine", "peripatetic", "impecunious", "obsequious", "temerity", "indolent", "prosaic", "saccharine", "inexorable", "obstreperous", "sentient",
       "phlegmatic", "prurient", "vociferous", "truculent", "ephemeral", "imperious", "amorous", "officious", "presumptuous", "felicitous", "equanimity", "peccadillo"];



    wrongWords = 0;
    correctWords = 0;
    points = 0;
    pointsDisplay.innerText = points;
    capturedWords.innerText = correctWords;
    missedWords.innerText = wrongWords;
    startGame = true;
    var audioPlayAgain = new Audio('sounds/start1.wav');
    audioPlayAgain.play();


    playGame();
  });

//restart game


function playGame() {

  if(wrongAnswerFlag === false)
  {
    noErrors()
  }
  else if (wrongAnswerFlag === true)
  {

    setTimeout(noErrors, 7000);
  }

}


//function checks word
submitButton.addEventListener("click", function(arrayNumber) {
  var userInput = document.querySelector("input").value;

  if (userInput.toLocaleLowerCase() === randomWord) {
    points = points + 10;
    correctWords++;
    pointsDisplay.innerText = points;
    capturedWords.innerText = correctWords;
    //write code to dispplay points here

    var audio = new Audio('sounds/points1.wav');
    audio.play();

    document.querySelector("input").value = "";


  } else {

    wrongAnswerFlag = true;
    console.log("wrong answer flad = "+wrongAnswerFlag)
    showMistakes(randomWord, userInput)
    h1Saying.innerText = "Wrong!";
    wrongWords++;
    missedWords.innerText = wrongWords;

    //sounds
    var audioWrong = new Audio('sounds/wrong1.wav');
    audioWrong.play();

    document.querySelector("input").value = "";

  }

  playGame();

});


var randomWord;

//this function selects the word
function displayWord(wordList) {

  if (wordList.length === 0) {
    h1Saying.innerText = "no more words";
    document.getElementById("answerButton").style.cssText = "visibility: hidden;";
    document.getElementById("inputBox").style.cssText = "visibility: hidden;";
    document.getElementById("playAgain-btn").style.cssText = "visibility: visible;";
  } else if (wordList.length > 1 && hideMode === false) {

    var arrayNumber = Math.floor(Math.random() * wordList.length);
    var maxWords = wordList.length;
    h1Saying.innerText = wordList[arrayNumber];

    //console.log("number:"+arrayNumber);
    randomWord = wordList[arrayNumber];

     //current function being used for api calls
    apiGetWord(randomWord);
    apiGetDefinition(randomWord);

    wordList.splice(arrayNumber, 1);
    //console.log("new word:"+ randomWord);
  }else if (wordList.length > 1 && hideMode === true) {

    var arrayNumber = Math.floor(Math.random() * wordList.length);
    var maxWords = wordList.length;
    //h1Saying.innerText = wordList[arrayNumber];

    randomWord = wordList[arrayNumber];

     //current function being used for api calls
    apiGetWord(randomWord);
    apiGetDefinition(randomWord);

    wordList.splice(arrayNumber, 1);

  } else if (wordList.length === 1) {
    wordList.pop();
  }

}




function hideWord() {
  h1Saying.innerText = "";
}



  // if user clicks sound icon
  soundButton.addEventListener("click", function(){
   apiGetWord(randomWord)
  });

  $hamMenu.click(function(){

    $dropDownMenu.toggle()
    $settingsMenu.hide()
  })

  $settingsButton.click(function(){

    $dropDownMenu.toggle()
    $settingsMenu.toggle()
  })



// level clicks mobile
$easyButton.click(function(){
  SetDifficulty("easy");

  easyMode = true;
  normalMode = false;
  hardMode = false;

 // check level status mobile
 checkLevelStatusMobile()

 // check tablet/ desktop
 checkLevelStatusDesktop()

  playGame();
})

$normalButton.click(function(){
  SetDifficulty("normal");

  normalMode = true;
  easyMode = false;
  hardMode = false;

 // check level status mobile
 checkLevelStatusMobile()

 // check tablet/ desktop
 checkLevelStatusDesktop()

 playGame();
})


$hardButton.click(function(){
  SetDifficulty("hard");

  normalMode = false;
  easyMode = false;
  hardMode = true;

 // check level status mobile
 checkLevelStatusMobile()

 // check tablet/ desktop
 checkLevelStatusDesktop()

 playGame();
})



$dtSetBtn.click(function(){

  $desktopSettings.toggle()
})


// level clicks tablet / desktop
$deskEasyBtn.click(function(){
  SetDifficulty("easy");

  easyMode = true;
  normalMode = false;
  hardMode = false;

 // check level status mobile
 checkLevelStatusMobile()

 // check tablet/ desktop
 checkLevelStatusDesktop()

  playGame();
})

$deskNoramlBtn.click(function(){
  SetDifficulty("normal");

  normalMode = true;
  easyMode = false;
  hardMode = false;

 // check level status mobile
 checkLevelStatusMobile()

 // check tablet/ desktop
 checkLevelStatusDesktop()

 playGame();
})


$deskHardBtn.click(function(){
  SetDifficulty("hard");

  normalMode = false;
  easyMode = false;
  hardMode = true;

 // check level status mobile
 checkLevelStatusMobile()

 // check tablet/ desktop
 checkLevelStatusDesktop()

 playGame();
})


//$lobbyBtn.click(function())



// checking settings on mobile
function checkLevelStatusMobile(){

  if(easyMode === true)
  {
    $easyButton.css("color", "#29bb89")
    $normalButton.css("color", "white")
    $hardButton.css("color", "white")
  }
  else if(normalMode === true)
  {
    $easyButton.css("color", "white")
    $normalButton.css("color", "#29bb89")
    $hardButton.css("color", "white")
  }
  else if(hardMode === true)
  {
    $easyButton.css("color", "white")
    $normalButton.css("color", "white")
    $hardButton.css("color", "#29bb89")
  }


}

// checking settings on tablet and desktop
function checkLevelStatusDesktop(){


  if(easyMode === true)
  {
    $deskEasyBtn.css("color", "#29bb89")
    $deskNoramlBtn.css("color", "white")
    $deskHardBtn.css("color", "white")
  }
  else if(normalMode === true)
  {
    $deskEasyBtn.css("color", "white")
    $deskNoramlBtn.css("color", "#29bb89")
    $deskHardBtn.css("color", "white")
  }
  else if(hardMode === true)
  {
    $deskEasyBtn.css("color", "white")
    $deskNoramlBtn.css("color", "white")
    $deskHardBtn.css("color", "#29bb89")
  }


}

function checkModeStatusDesktop(){

  if(hideMode === true){
     $hideStatus.text("ON")
     $hideStatus.css("color", "#29bb89")
  }else if(hideMode === false){
     $hideStatus.text("OFF")
     $hideStatus.css("color", "#fff")
  }


}

function checkModeStatusMobile(){
  if(hideMode === true){
     $hideMobileStatus.text("ON")
     $hideMobileStatus.css("color", "#29bb89")
  }else if(hideMode === false){
     $hideMobileStatus.text("OFF")
     $hideMobileStatus.css("color", "#fff")
  }
}







function showMistakes(word, userspelling){

 $correctH2.text(word)
 $wrongH2.text(userspelling)

 wordDefinition.innerText = "";

  setTimeout(hideMistakes, 4000);

}

function hideMistakes()
{
  $correctH2.text("")
  $wrongH2.text("")
}


function noErrors()
{

  wrongAnswerFlag = false;

  if (startGame === true && normalMode === true && points < 100 && wrongWords != 3) {
    h1Saying.innerText = "Next word is";
    wordDefinition.innerText = "";

    setTimeout(displayWord(normalList), 3000);
    setTimeout(hideWord, 3000);
  }
  else if(startGame === true && easyMode === true && points < 100 && wrongWords != 3) {
    setTimeout(displayWord(easyList), 3000);
    setTimeout(hideWord, 3000);
  }
  else if(startGame === true && hardMode === true && points < 100 && wrongWords != 3)
  {
    setTimeout(displayWord(hardList), 3000);
    setTimeout(hideWord, 3000);
  }
   else if (points === 100) {
    h1Saying.innerText = "YOU WIN!";
    document.getElementById("answerButton").style.cssText = "visibility: hidden;";
    document.getElementById("inputBox").style.cssText = "visibility: hidden;";
    document.getElementById("sound-icon").style.cssText = "visibility: hidden;";
    document.getElementById("playAgain-btn").style.cssText = "visibility: visible;";

    let audioWin = new Audio("sounds/applause.mp3")
    audioWin.play();
    sendPoints();

    startGame = false;
  } else if(wrongWords === 3){
    h1Saying.innerText = "YOU LOSE!";
    document.getElementById("answerButton").style.cssText = "visibility: hidden;";
    document.getElementById("inputBox").style.cssText = "visibility: hidden;";
    document.getElementById("playAgain-btn").style.cssText = "visibility: visible;";
    startGame = false;
  }
  else
  {
     //d0 nothing
  }
}








/// sendin data function
function sendPoints(){

const ship = {
   points: points,
};

fetch("/points", {
    method: "POST",
    body: JSON.stringify(ship),
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }});

}




function apiGetWord(word){

  const ship = {
     word: word,
  };

  fetch("/com", {
      method: "POST",
      body: JSON.stringify(ship),
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }}).then(response => response.json())
           .then(function(data){
            let audio = new Audio(data.voice);
            audio.play();

           });

}


function apiGetDefinition(word){

  const ship = {
     word: word,
  };

  fetch("/de", {
      method: "POST",
      body: JSON.stringify(ship),
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }}).then(response => response.json())
           .then(function(data){

           wordDefinition.innerHTML = data.text;

           });

}



function SetHidemode(action){

  const ship = {
     action: action,
  };

  fetch("/hidemode", {
      method: "POST",
      body: JSON.stringify(ship),
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }}).then(response => response.json())
           .then(function(data){
              let mode = data.modeSetting;

           });

}


function SetDifficulty(action){

  const ship = {
     action: action,
  };

  fetch("/difficulty", {
      method: "POST",
      body: JSON.stringify(ship),
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }}).then(response => response.json())
           .then(function(data){
              let mode = data.modeSetting;

           });

}
