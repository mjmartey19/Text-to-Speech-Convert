//Step 1
const textarea = document.querySelector("textarea"),
speechBtn = document.querySelector("button");
//Step 1 Ends
voiceList = document.querySelector("select");
isSpeaking = true;
//Step 2

//compactibility especial mozilla firfox.
let synth = speechSynthesis;
function voices(){
 for(let voice of synth.getVoices()){
    console.log(voice);//output 'Microsoft David - English (United States)', name: 'Microsoft David - English (United States)', lang: 'en-US', localService: true, default: true}
    let option = `<option value="${voice.name}">${voice.name}(${voice.lang})</option>`;
    voiceList.insertAdjacentHTML("beforeend",option);//Insert option tag beforeend of select tag
}
}
synth.addEventListener("voiceschanged", voices);
//Step 2 ENDS

//Step 4
function textToSpeech(text){
  let utterance = new SpeechSynthesisUtterance(text);
  for(let voice of synth.getVoices()){
    //if the available device voice is equal to the user selected voice.
    //then set the speech voice to the user selected voice.
    if(voice.name === voiceList.value){
        utterance.voice = voice
    }
  }
  synth.speak(utterance);//Invokes the speaking
}
//STEP 4 ENDS
//step 3
speechBtn.addEventListener("click",e=>{
    e.preventDefault();
    if(textarea.value!==""){
        if(!synth.speaking){//if an utterance/speech is not currently in the process of speaking
            textToSpeech(textarea.value);
        }
         if(textarea.value.length>80){
            //if isSpeaking is true then chnage it's value to false and resume the utterance
            //else chnage it's value to true and pause the spech
            if(isSpeaking){
                synth.resume();
                isSpeaking = false;
                speechBtn.innerText = "Pause Speech"
            }else{
                synth.pause();
                isSpeaking = true;
                speechBtn.innerText = "Resume Speech"
            }
            setInterval(()=>{
                if(!synth.speaking && !isSpeaking){
                    isSpeaking = true;
                    speechBtn.innerText = "Convert To Speech"
                }
            })
         }
        
    }
})

//Step 5
//Cancel speak when refreshed
window.addEventListener('load', (e) => {
    synth.cancel();
  });