const key1 = "7varsmvw7093es7imjrb6wcqcrk4n25ir3t3jevsqveokyjis";
const key2 = "1j18nuflxvd7whbkzlf4pr7t3xo0e4zqy7sqo03831f7vrjmz";



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
var h1Saying = document.querySelector("h1");
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
var points =  0;
var wrongWords = 0;

var easyMode = false;
var normalMode = true;
var hardMode = false;

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


var normalList = ["consent", "elicit", "authentic", "collusion", "acceptance", "apprehensive", "autonomy", "dogged", "evade",
"adversary", "attentive", "banish", "barricade", "addictive", "commotion", "conspicuous", "counter", "cunning", "debris",
"defiance", "destination", "diminish", "emerge", "ember", "foresight", "fragrance", "grueling", "habitation", "ignite", "jargon", "luminous",
 "momentum", "multitude", "lullaby", "reckoning", "zealous", "resin", "mayonnaise", "shrunken", "season", "brainstorm", "culture", "drastic",
 "envious", "extinction", "gasoline", "fraction", "government", "hazardous", "interview", "library", "material", "mathematics", "encouraging",
"economic", "proscribe", "remiss", "calamity", "dumbbell","cemetery", "weird", "harass", "eureka", "hobnob", "nemesis", "aloft", "debunk",
 "mature", "conjecture", "scrimp", "ungainly", "endorse", "entail", "eradicate", "truncate", "tumult", "abet", "corollary", "excavate",
 "exonerate", "shrewd", "wallop", "affinity", "diffuse", "ensue", "guardian", "influx", "longevity", "ordinary"];


 var easyList = ["call", "air", "also", "both", "family", "after", "any", "dish", "clock", "around", "barn", "back", "cold", "animal", "always",
 "bath", "ask", "boat", "been", "each", "buy", "clean", "fast", "dress", "feed", "best", "cannot", "before", "because", "deer", "drop", "every",
 "friend", "found", "first", "fight", "gave", "give", "goat", "good", "happy", "help","here", "high", "him", "home", "house", "jump", "just", "kind",
 "drum", "kiss", "large", "light", "line", "lion", "list", "little", "lock", "long", "look", "loud", "lunch", "made", "mess", "might", "most", "much",
 "must", "new", "night", "nine", "now", "off", "only", "or", "our", "out", "out", "path", "place", "plus", "pool", "put", "rabbit", "read", "rest",
 "right", "rock", "said", "sea", "second", "seem", "send", "seven", "shape", "sight", "silly", "sing", "sister", "slid", "sound", "stamp", "state",
 "still","stone", "such", "take", "tell", "thing", "ton", "treat", "trick", "tune", "under", "use", "wash", "well", "went", "yard", "year",
  "done", "lab", "the", "down", "are", "car", "she", "why", "at", "all", "what", "was", "with", "which", "each", "these", "would", "from",
  "water", "many", "other", "look", "number", "part", "write", "have", "turn", "came", "over", "know", "live", "try", "great", "study", "move", "world"]



  var hardList = ["surveillance", "chauffeur", "misspell", "intelligence", "pronunciation", "handkerchief", "questionnaire", "unconscious", "precocious", "idiosyncrasy",
  "conscientious", "necessary", "bouillon", "encumber", "holistic", "incongruous", "aberration", "abjure", "abrogate", "abstruse", "admonish", "ambivalent", "amenable",
  "apathetic", "antithesis", "assiduous", "beguile", "capitulate", "demagogue", "denigrate", "diaphanous", "didactic", "disrepute", "ebullient", "egregious", "emollient",
  "fatuous", "impetuous", "Sacrilegious", "fallacious", "forbearance", "crescendo", "irresistible", "millennium", "inoculate", "supersede", "minuscule", "embarrass",
  "occurrence", "amorphous", "facetious", "equivocal", "redolent", "stratagem", "aplomb"]




var numberList = [];

var secDiv = document.querySelector("div#sec");
var thirdDiv = document.querySelector("div#third");

var correctWords = 0;
var wrongWords = 0;
var randomWord;


hiddenButtons = document.getElementsByClassName("hide1");

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
     "mature", "conjecture", "scrimp", "ungainly", "endorse", "entail", "eradicate", "truncate", "tumult", "abet", "corollary", "excavate",
     "exonerate", "shrewd", "wallop", "affinity", "diffuse", "ensue", "guardian", "influx", "longevity", "ordinary"];



     var easyList = ["call", "air", "also", "both", "family", "after", "any", "dish", "clock", "around", "barn", "back", "cold", "animal", "always",
     "bath", "ask", "boat", "been", "each", "buy", "clean", "fast", "dress", "feed", "best", "cannot", "before", "because", "deer", "drop", "every",
     "friend", "found", "first", "fight", "gave", "give", "goat", "good", "happy", "help","here", "high", "him", "home", "house", "jump", "just", "kind",
     "drum", "kiss", "large", "light", "line", "lion", "list", "little", "lock", "long", "look", "loud", "lunch", "made", "mess", "might", "most", "much",
     "must", "new", "night", "nine", "now", "off", "only", "or", "our", "out", "out", "path", "place", "plus", "pool", "put", "rabbit", "read", "rest",
     "right", "rock", "said", "sea", "second", "seem", "send", "seven", "shape", "sight", "silly", "sing", "sister", "slid", "sound", "stamp", "state",
     "still","stone", "such", "take", "tell", "thing", "ton", "treat", "trick", "tune", "under", "use", "wash", "well", "went", "yard", "year",
      "done", "lab", "the", "down", "are", "car", "she", "why", "at", "all", "what", "was", "with", "which", "each", "these", "would", "from",
      "water", "many", "other", "look", "number", "part", "write", "have", "turn", "came", "over", "know", "live", "try", "great", "study", "move", "world"]



      var hardList = ["surveillance", "chauffeur", "misspell", "intelligence", "pronunciation", "handkerchief", "questionnaire", "unconscious", "precocious", "idiosyncrasy",
     "conscientious", "necessary", "bouillon", "encumber", "holistic", "incongruous", "aberration", "abjure", "abrogate", "abstruse", "admonish", "ambivalent", "amenable",
     "apathetic", "antithesis", "assiduous", "beguile", "capitulate", "demagogue", "denigrate", "diaphanous", "didactic", "disrepute", "ebullient", "egregious", "emollient",
     "fatuous", "impetuous", "Sacrilegious", "fallacious", "forbearance", "crescendo", "irresistible", "millennium", "inoculate", "supersede", "minuscule", "embarrass",
     "occurrence", "amorphous", "facetious", "equivocal", "redolent", "stratagem", "aplomb"]



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
  } else if (wordList.length > 1) {

    var arrayNumber = Math.floor(Math.random() * wordList.length);
    var maxWords = wordList.length;
    h1Saying.innerText = wordList[arrayNumber];
    //console.log("number:"+arrayNumber);
    randomWord = wordList[arrayNumber];

     //current function being used for api calls
    ajaxISS(randomWord, key1)

    wordList.splice(arrayNumber, 1);
    //console.log("new word:"+ randomWord);
  } else if (wordList.length === 1) {
    wordList.pop();
  }

}


function hideWord() {
  h1Saying.innerText = "";
}



  // if user clicks sound icon
  soundButton.addEventListener("click", function(){
   ajaxISS(randomWord, key2)
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







function showMistakes(word, userspelling){

 $correctH2.text(word)
 $wrongH2.text(userspelling)

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
    setTimeout(hideWord, 1000);
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



// new api request function
async function ajaxISS(word, key){

let errorCounter = 0
  const apiRequstUrl = "https://api.wordnik.com/v4/word.json/"+word+"/audio?useCanonical=false&limit=10&api_key="+key;
  const response = await fetch(apiRequstUrl);

  try {

    const data = await response.json();
    if(!data[1].fileUrl)
    {
       throw new SyntaxError("NO file On Name!")
    }
    else
    {
      errorCounter = 0
      // asigning data to variables
      const selectedWord = data[0].word;
      const wordAudio = data[1].fileUrl;

      //asigning sound file
      audioUrl = wordAudio;

      //testing
    //  audioUrl = obj001[1].sound;

      //play word
      let audio = new Audio(audioUrl)
      audio.play();
    }

  }catch(e)
  {
      if(errorCounter !== 30){
        errorCounter ++;
        console.log("API  ERROR / File Not Found: "+e)
        setTimeout(ajaxISS(randomWord, key2), 1000);
      }else{
        errorCounter = 0;
      }

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




function apiGetWord(){

  const ship = {
     word: cat,
  };

  fetch("/com", {
      method: "POST",
      body: JSON.stringify(ship),
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }});
}


apiGetWord();
