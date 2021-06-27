

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







// Mobile
 hideModeMobileBtn.addEventListener("click", function() {

if(hideMode === false){
   hideMode = true;
   databaseSettings("on");
   $hideMobileStatus.text("ON")
   $hideMobileStatus.css("color", "#29bb89")
}else if(hideMode === true){
   hideMode = false;
   databaseSettings("off");
   $hideMobileStatus.text("OFF")
   $hideMobileStatus.css("color", "#fff")
}

// check mode status Desktop
checkModeStatusDesktop();

// check mode status Mobile
checkModeStatusMobile();


});










// checking if username already in use
User.findOne({ nickname: req.body.username }, function (err, foundUser) {
  if(err){
    console.log(err)
    res.redirect("/account?uerror=true");
  }
  else{
    if(foundUser){

       res.redirect("/account?uerror=true");
    }
  }
});



// adding username to profile
User.findByIdAndUpdate(req.user.id, { nickname: req.body.username }, function(err, foundUser){
  if(err){
    console.log(err)
    res.redirect("/account?uerror=true");
  }
  else{
    if(foundUser){
       res.redirect("/account");
    }
  }
});

}else{
console.log(error);
}
