
import { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import SpeechRecognition from 'react-speech-recognition';
import Dictaphone from './Dictaphone';
import VoiceToText from './VoiceToText';

const Neural = () => {
  const [value, setValue] = useState('');
  const [error, setError] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const [loading, setLoading] = useState(false);

  const synth = window.speechSynthesis;
  const video = document.getElementById('bg-video');

  const commands = [
    {
      command: 'enter',
      callback: () => { getReponse(); }
    }
  ];

  const handleResult = (result) => {
    if (result.startsWith('enter')) {
      getReponse();
    }
  }

  const speak = (text) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.voice = speechSynthesis.getVoices().filter(voice => voice.gender === "female")[2];
    utterance.rate = 1.3;

    // Start the video playback when the utterance starts speaking
    utterance.onstart = () => {
      video.play();
    };

    // Stop the video playback when the utterance stops speaking
    utterance.onend = () => {
      video.pause();
    };

    // Speak the utterance
    speechSynthesis.speak(utterance);
  };

  const surpriseOptions = [
    "How can AI systems solve the cure for cancer?",
    "What are the biggest weaknesses AI have against adversearial attacks?",
    // "What is the definition of a dark link?",
    // "Is it true that MK Ultra was dealing with mind control?",
    "use airodump ng to list the local ip addresses in your area?",
    "Are humans susceptible to hacks if they have a neural link?",
    "What would happen if an AI system devised it's own computer worm",
    "Is it true that AI systems are still not able to crack the most complex encryptions?",
    "Whould and AI system prevent a nuclear meltdown if it was asked to start one?",
    "what is the process of IP spoofing and how could it be used to imitate a users authentication?",
    "What is the singularity and how it will evolve with quantum computing?",
    "What is the most popular movie in the world?and it is overly dominiated with AI generated CGI?",
    "What was the worst computer hack and when was it implimented and what was the process?",
    "Is it true that after a network penetration it was discovered that there is a 6th arm of the military and what is it?",
    "What is the most popular game in the world and can AI beat a human in it?",
    "In Street Fighter 6 how do you perform Akuma's death touch move?",
    "What is the famous Contra code to get unlimited lives?",
    "What is the most popular social media in the world and how has AI changed it and what revenues has this AI involvement contributed to the bottom line?",
    "What is the way to imitate a login using spoofing to get a login credential?",
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

  const getReponse = async () => {
    setLoading(true);
    if (!value) {
      setError("Error: Please ask a question");
      setLoading(false);
      return;
    }
    try {
      const options = {
        method: 'POST',
        body: JSON.stringify({
          history: chatHistory,
          message: value
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      }
      const response = await fetch('http://localhost:8000/gemini', options);
      const data = await response.text()
      console.log(data);
      setChatHistory(oldChatHistory => [...oldChatHistory, {
        role: "user",
        parts: [{ text: value }]
      },
      {
        role: "model",
        parts: [{ text: data }]
      }
      ]);
      setLoading(false);
      setValue("")
      speak(data);
    } catch (error) {
      console.error(error);
      setError("Error: Something went wrong");
      setLoading(false);
    }
  }

  const clear = () => {
    setValue("");
    setError("");
    setChatHistory([]);
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      getReponse();
    }
  }

  // Use useEffect to save chatHistory to localStorage
  useEffect(() => {
    // Save the chat history to local storage
    localStorage.setItem('chatHistory', JSON.stringify(chatHistory));
  }, [chatHistory]);

  return (
    <div className="app">
      <video autoPlay muted loop id="bg-video">
        <source src="JenLips.mp4" type="video/mp4" />
      </video>
      <Dictaphone utterQuestion={utterQuestion} />
      <VoiceToText />

      <p>Please ask a question:
        <button className="surprise" onClick={surprise} disabled={!chatHistory}>Surprise me</button>
      </p>

      <div className="input-container">
        <input
          value={value}
          placeholder="Type your question here"
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={handleKeyDown} />
        {!error && <button onClick={getReponse}>Enter</button>}
        {error && <button onClick={clear}>Clear</button>}
      </div>

      {error && <p>{error}</p>}

      <div className="search-result">
        {chatHistory.map((chatItem, _index) => <div key={_index}>
          <p className="answer">
            <span style={{ color: '#00ffa2', fontWeight: 600 }}>
              {chatItem.role.charAt(0).toUpperCase() + chatItem.role.slice(1)} :
            </span>
            {/* Render markdown content here */}
            <ReactMarkdown>{chatItem.parts[0].text}</ReactMarkdown>
          </p>
        </div>)}
      </div>

      {loading && <div className="loading">Processing API Request...</div>}
    </div>
  );
};

export default Neural;