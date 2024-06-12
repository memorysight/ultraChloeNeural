import React from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import {useEffect} from 'react';

const Dictaphone = ({utterQuestion}) => {

   

  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition();

  useEffect(()=>{
    utterQuestion(transcript);
 },[transcript])

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }




  //may not work in some browsers
  //used to comsume the microphone transcript
//   const { transcript } = useSpeechRecognition()

// used to reset the microphone transcript
// const { resetTranscript } = useSpeechRecognition()


  return (
    <div>
      <div className='mic'>Microphone: {listening ? 'on' : 'off'}</div>
      <button onClick={SpeechRecognition.startListening}>Start</button>
      <button onClick={SpeechRecognition.stopListening}>Stop</button>
      <button onClick={resetTranscript}>Reset</button>
      <p>{transcript}</p>
    </div>
  );
};
export default Dictaphone;
