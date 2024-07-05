import { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";
import Dictaphone from "./Dictaphone";
import VoiceToText from "./VoiceToText";

const App = () => {
  const video = document.getElementById("bg-video");

  const [value, setValue] = useState("");
  const [error, setError] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [questionCount, setQuestionCount] = useState(0);
  const [showSurpriseButton, setShowSurpriseButton] = useState(false);

  // Get the speech synthesis object
  const synth = window.speechSynthesis;

  const surpriseOptions = [
    "When is Christmas?",
    "What is the capital of France?",
    "What is the population of the world?",
    "What is the tallest building in the world?",
    "What is the largest country in the world?",
    "What is the longest river in the world?",
    "What is the smallest country in the world?",
    "What is the most spoken language in the world?",
    "What is the most popular sport in the world?",
    "What is the most popular food in the world?",
    "What is the most popular drink in the world?",
    "What is the most popular animal in the world?",
    "What is the most popular movie in the world?",
    "What is the most popular song in the world?",
    "What is the most popular book in the world?",
    "What is the most popular game in the world?",
    "What is the most popular app in the world?",
    "What is the most popular website in the world?",
    "What is the most popular social media in the world?",
    "What is the most popular TV show in the world?",
    "What is the most popular movie genre in the world?",
    "What is the most popular music genre in the world?",
    "What is the most popular book genre in the world?",
    "What is the most popular game genre in the world?",
    "What is the most popular app genre in the world?",
    "What is the most popular website genre in the world?",
    "What is the most popular social media genre in the world?",
    "What is the most popular TV show genre?"
  ];

  const handleStartSpeaking = () => {
    // Disable the surprise me button
    const surpriseElement = document.querySelector(".surprise");
    if (surpriseElement) {
      surpriseElement.disabled = true;
    }
  };

  const handleStopSpeaking = () => {
    // Enable the surprise me button
    const surpriseElement = document.querySelector(".surprise");
    if (surpriseElement) {
      surpriseElement.disabled = false;
    }
  };

  // Remove the unnecessary CSS class from the video element
  // video.classList.remove("bg-video");

  const speak = (text) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.voice = speechSynthesis
      .getVoices()
      .filter((voice) => voice.gender === "female")[2];
    utterance.rate = 1.3;

    // Start the video playback when the utterance starts speaking
    utterance.onstart = () => {
      video.play();
      const surpriseElement = document.querySelector(".surprise");
      if (surpriseElement) {
        surpriseElement.disabled = true;
      }
    };

    // Stop the video playback when the utterance stops speaking
    utterance.onend = () => {
      video.pause();
      const surpriseElement = document.querySelector(".surprise");
      if (surpriseElement) {
        surpriseElement.disabled = false;
      }
    };

    // Speak the utterance
    speechSynthesis.speak(utterance);
  };

  const utterQuestion = (text) => {
    setValue(text);
  };

  const getReponse = async () => {
    if (!value) {
      setError("Error: Please ask a question");
      return;
    }

    try {
      const options = {
        method: "POST",
        body: JSON.stringify({
          history: chatHistory,
          message: value
        }),
        headers: {
          "Content-Type": "application/json"
        }
      };
      const response = await fetch("http://localhost:8000/gemini", options);
      const data = await response.text();
      console.log(data);
      setChatHistory((oldChatHistory) => [
        ...oldChatHistory,
        {
          role: "user",
          parts: [{ text: value }]
        },
        {
          role: "model",
          parts: [{ text: data }]
        }
      ]);
      setValue("");
      speak(data);

      // Increment the question count
      setQuestionCount(questionCount + 1);

      // Show the surprise me button after 5 consecutive questions
      if (questionCount >= 5) {
        setShowSurpriseButton(true);
      }
    } catch (error) {
      console.error(error);
      setError("Error: Something went wrong");
    }
  };

  const clear = () => {
    setValue("");
    setError("");
    setChatHistory([]);
    setQuestionCount(0);
    setShowSurpriseButton(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && value !== "") {
      e.preventDefault();
      getReponse();
    }
  };

  useEffect(() => {
    if (chatHistory.length === 0) {
      setShowSurpriseButton(false);
    }

    return () => {
      // Clean up the speech recognition instance
      if (SpeechRecognition.listening) {
        SpeechRecognition.stopListening();
      }
    };
  }, [chatHistory.length]);

  // Get the results from the speech recognition
  const commands = [
    {
      command: "surprise",
      callback: () => {
        surprise();
      }
    }
  ];
  const { transcript } = useSpeechRecognition({ commands });

  if (transcript) {
    surprise();
  }

  const surprise = () => {
    if (!chatHistory || chatHistory.length === 0) {
      return;
    }

    const randomIndex = Math.floor(Math.random() * surpriseOptions.length);
    const question = surpriseOptions[randomIndex];
    utterQuestion(question);
    getReponse();
  };

  return (
    <div className="app">
      <video autoPlay muted loop id="bg-video">
        <source src="Hal9muchBetterFinal2.mp4" type="video/mp4" />
      </video>
      <Dictaphone utterQuestion={utterQuestion} />
      <VoiceToText />
      <p>
        Please ask a question:
        {chatHistory.length > 0 ? null : (
          <button
            className="surprise"
            onClick={surprise}
            disabled={!chatHistory}
            onMouseDown={handleStartSpeaking}
            onMouseUp={handleStopSpeaking}
          >
            Surprise me
          </button>
        )}
        {showSurpriseButton ? null : (
          <span>(Ask 5 questions to unlock the surprise button)</span>
        )}
      </p>
      <div className="input-container">
        <input
          value={value}
          placeholder="Type your question here"
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        {!error && <button onClick={getReponse}>Enter</button>}
        {error && <button onClick={clear}>Clear</button>}
      </div>
      {error && <p>{error}</p>}
      <div className="search-result">
        {chatHistory.map((chatItem, _index) => (
          <div key={_index}>
            <p className="answer">
              <span
                style={{ color: "#00ffa2", fontWeight: 600 }}
              >
                {chatItem.role.charAt(0).toUpperCase() + chatItem.role.slice(1)}:
              </span>
              {/* Render markdown content here */}
              <ReactMarkdown>{chatItem.parts[0].text}</ReactMarkdown>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;