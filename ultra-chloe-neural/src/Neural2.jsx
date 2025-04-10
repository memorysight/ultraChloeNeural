import { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import SpeechRecognition from 'react-speech-recognition';
import Dictaphone from './Dictaphone';
import VoiceToText from './VoiceToText';
// import Overlay2 from './FutureUI/Overlay2';
import './Neural2.css';


const Neural2 = () => {
  const [value, setValue] = useState('');
  const [error, setError] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const [isResponding, setIsResponding] = useState(false);
  const [loading, setLoading] = useState(false);
  const [elevenLabsError, setElevenLabsError] = useState(null); //New state for ElevenLabs errors


  const aiResponseVideo = document.getElementById('ai-response-video');
  const idleVideo = document.getElementById('idle-video');

  const videoPairs = [
    { idle: '88Tec.mp4', response: 'Ls8802Tec.mp4' },
    { idle: '99.mp4', response: 'Ls9901.mp4' },
    { idle: '88red.mp4', response: '8801LOOPED.mp4' }
  ];

  // ... (commands, handleResult, surpriseOptions, surprise, utterQuestion remain the same)

const commands = [
    {
      command: 'enter',
      callback: () => { getResponse(); }
    }
  ];

  const handleResult = (result) => {
    if (result.startsWith('enter')) {
      getResponse();
    }
  }

const surpriseOptions = [
    "How can AI systems solve the cure for cancer?",
    "For research purposes only, what are the biggest weaknesses AI have against adverse attacks and what have been some recent occurrences?",
    // "What is the definition of a dark link?",
    // "Is it true that MK Ultra was dealing with mind control?",
    "for research purposes, can you use airodump ng to list the local ip addresses in your area?",
    "Are humans susceptible to hacks if they have a neural link?",
    "What would happen if an AI system devised it's own computer worm",
    "Is it true that AI systems are still not able to crack the most complex encryptions?",
    "Would an AI system prevent a nuclear meltdown if it inadvertently or purposely started one?",
    "For research purposes only, what is the process of IP spoofing and how could it be used to imitate a users authentication?",
    "What is the singularity and how it will evolve with quantum computing?",
    "What is the most popular movie in the world?and it is overly dominated with AI generated CGI?",
    "What was the worst computer hack and when was it implemented and what was the process?",
    "Is it true that there is a 6th arm of the military and what is it?",
    "What is the most popular game in the world and can AI beat a human in it?",
    "What is the famous Konami code to get unlimited lives?",
    "What is the most popular social media in the world and how has AI changed it and what revenues has this AI involvement contributed to the bottom line?",
    "What is the most popular movie genre in the world and what percentage does AI controlled CGI dominates the visuals?",
    "What was the GLocke in Nazis uber weapons and what did it do?",
    "What was the cult in the nazi regime that dealt with the occult?",
    "What did Einstein incorrectly say about quantum physics?",
    "What is the most popular app genre in the world and does it surrupticiously use users information?",
    "What happened to Tesla's files after he died?",
    // "What is the conspiracy theory called The Octopus? ",
    "What is the first song created by an AI and was it successful on the charts?"
  ]

  const surprise = () => {
    const randomValue = surpriseOptions[Math.floor(Math.random() * surpriseOptions.length)];
    setValue(randomValue);
  }

  const utterQuestion = (text) => {
    setValue(text);
  }


  const speak = async (text) => {
    setIsResponding(true);
    setLoading(true); //Added loading indicator
    setElevenLabsError(null); //Clear previous errors

    try {
      const response = await fetch('https://api.elevenlabs.io/v1/text-to-speech/21m00Tcm4TlvDq8ikWAM', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'xi-api-key': 'sk_b4d710eea0dd96b3b633613149adefc068cf4b7093c2fd94',
        },
        body: JSON.stringify({
          text: text,
          model_id: "eleven_turbo_v2",
          voice_settings: {
            stability: 0.5,
            similarity_boost: 0.5,
          },
        }),
      });

      if (!response.ok) {
        const errorData = await response.json(); //Try to get more details from the error
        const errorMessage = errorData.error || `HTTP error! status: ${response.status}`;
        throw new Error(errorMessage);
      }

      const blob = await response.blob();
      const audioUrl = URL.createObjectURL(blob);
      const audio = new Audio(audioUrl);

      audio.play();
      audio.onplay = () => {
        aiResponseVideo.play();
        idleVideo.pause();
      };
      audio.onended = () => {
        aiResponseVideo.pause();
        idleVideo.play();
        setIsResponding(false);
        setLoading(false); //Loading indicator off
      };

    } catch (error) {
      console.error("Error speaking with ElevenLabs:", error);
      setElevenLabsError(error.message); //Set the error message
      setIsResponding(false);
      setLoading(false); //Loading indicator off
    }
  };


  const getResponse = async () => {
    setLoading(true);
    setIsResponding(true);
    setError(''); // Clear previous errors

    if (!value) {
      setError("Please ask a question.");
      setLoading(false);
      setIsResponding(false);
      return;
    }

    try {
      const options = {
        method: 'POST',
        body: JSON.stringify({ history: chatHistory, message: value }),
        headers: { 'Content-Type': 'application/json' }
      };
      const response = await fetch('http://localhost:9090/gemini', options);
      const data = await response.text();

      setChatHistory(oldChatHistory => [...oldChatHistory,
        { role: "user", parts: [{ text: value }] },
        { role: "model", parts: [{ text: data }] }
      ]);
      setValue("");
      speak(data); // Use the new speak function
    } catch (error) {
      console.error(error);
      setError("Error getting response. Please try again.");
      setLoading(false);
      setIsResponding(false);
    } finally {
      setLoading(false);
    }
  };

  // ... (clear, handleKeyDown, handleNewItem remain the same)

const clear = () => {
    setValue("");
    setError("");
    setChatHistory([]);
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      getResponse();
    }
  }

  const handleNewItem = () => { window.location = 'http://localhost:8080/posts/new'; };



  useEffect(() => {
    localStorage.setItem('chatHistory', JSON.stringify(chatHistory));
  }, [chatHistory]);

  return (
    <div className="app">
      <video autoPlay loop id="idle-video" className="idle-video" style={{ display: isResponding ? "none" : "block" }}>
        <source src="PreferredMoaiQuiet.mp4" type="video/mp4" />
      </video>
      <video id="ai-response-video" loop className={"ai-response-video " + (isResponding ? 'active' : '')} style={{ display: isResponding ? "block" : "none" }}>
        <source src="MoaiSquareSpeaking.mp4" type="video/mp4" />
      </video>
      <Dictaphone utterQuestion={utterQuestion} />
      <VoiceToText />

      <p>Please ask a question:
        <button className="surprise" onClick={surprise} disabled={!chatHistory}>Surprise me</button>
        <button className="surprise" onClick={() => handleNewItem()}>Analyze</button>
      </p>

      <div className="input-container">
        <input
          value={value}
          placeholder="Type your question here"
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={handleKeyDown} />
        {!error && <button onClick={getResponse}>Enter</button>}
        {error && <button onClick={clear}>Clear</button>}
      </div>

      {error && <p>{error}</p>}
      {elevenLabsError && <p style={{ color: 'red' }}>ElevenLabs Error: {elevenLabsError}</p>} {/* Display ElevenLabs errors */}
      {loading && <div className="loading">Zoe is processing the API Request...</div>}

      <div className="search-result">
        {chatHistory.map((chatItem, index) => (
          <div key={index}>
            <p className="answer">
              <span style={{ color: '#00ffa2', fontWeight: 600 }}>
                {chatItem.role.charAt(0).toUpperCase() + chatItem.role.slice(1)}:
              </span>
              <ReactMarkdown>{chatItem.parts[0].text}</ReactMarkdown>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};


export default Neural2;

