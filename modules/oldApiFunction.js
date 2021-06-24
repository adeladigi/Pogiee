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
