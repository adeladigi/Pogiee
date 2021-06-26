

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

    wordList.splice(arrayNumber, 1);
    //console.log("new word:"+ randomWord);
  } else if (wordList.length === 1) {
    wordList.pop();
  }

}
