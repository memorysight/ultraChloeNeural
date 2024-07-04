import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import SpeechRecognition from 'react-speech-recognition';
import Dictaphone from './Dictaphone';
import VoiceToText from './VoiceToText';



const App = () => {
  const [value, setValue] = useState("");
  const [error, setError] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const synth = window.speechSynthesis;


  const speak = (text) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.voice = speechSynthesis.getVoices().filter(voice => voice.gender === "female")[2];
    utterance.rate = 1.3;
    synth.speak(utterance);
    // speechSynthesis.cancel();
  };




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
  ]

  const surprise = () => {
    const randomValue = surpriseOptions[Math.floor(Math.random() * surpriseOptions.length)];
    setValue(randomValue);
  }



  const utterQuestion = (text)=>{
      setValue(text);
  }

  const getReponse = async () => {
    if (!value) {
      setError("Error: Please ask a question");
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
        parts: [{text: value }]
      },
      {
        role: "model",
        parts: [{text: data }]
      }
    ]);
    setValue("")
    speak(data);

    } catch (error) {
      console.error(error);
      setError("Error: Something went wrong");
    }
  }



  const clear = () => {
    setValue("");
    setError("");
    setChatHistory([]);
  }
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault(); // Prevent the form from being submitted
      getReponse();
    }
  }

  const video = document.getElementById("bg-video");

  // Set the current playback position to 10 seconds
  video.currentTime = 10;
  
  // Set the loop property to true
  video.loop = true;




  return (
    <div className="app">

          <video autoPlay muted loop id="bg-video">
              <source src="Hal9muchBetterFinal2.mp4" type="video/mp4" />
          </video>

      <Dictaphone utterQuestion = {utterQuestion}/>
       <VoiceToText /> 
        <p>Please ask a question:
        {/* <button className="surprise" onClick={surprise} disabled={!chatHistory}>Surprise me</button> */}
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

    </div>
  );
}

export default App;



















// import { useState } from 'react';
// import ReactMarkdown from 'react-markdown';


// const App = () => {
//   const [value, setValue] = useState("");
//   const [error, setError] = useState("");
//   const [chatHistory, setChatHistory] = useState([]);


//   const getReponse = async () => {
//     if (!value) {
//       setError("Error: Please ask a question");
//       return;
//     }
//     try {
//       const options = {
//         method: 'POST',
//         body: JSON.stringify({
//           history: chatHistory,
//           message: value
//         }),
//         headers: {
//           'Content-Type': 'application/json'
//         }
//       }
//       const response = await fetch('http://localhost:8000/gemini', options);
//       const data = await response.text()
//       console.log(data);
//       setChatHistory(oldChatHistory => [...oldChatHistory, {
//         role: "user",
//         parts: value
//       },
//       {
//         role: "model",
//         parts: data
//       }
//     ]);
//     setValue("")

//     } catch (error) {
//       console.error(error);
//       setError("Error: Something went wrong");
//     }
//   }

//   const clear = () => {
//     setValue("");
//     setError("");
//     setChatHistory([]);
//   }
//   const handleKeyDown = (e) => {
//     if (e.key === 'Enter') {
//       e.preventDefault(); // Prevent the form from being submitted
//       getReponse();
//     }
//   }
//   return (
//     <div className="app">
//         <p>What do you want to know?
//        </p>
//         <div className="input-container">
//           <input 
//             value={value}
//             placeholder="Type your question here"
//             onChange={(e) => setValue(e.target.value)} 
//             onKeyDown={handleKeyDown} />

//           {!error && <button onClick={getReponse}>Ask Me</button>}
//           {error && <button onClick={clear}>Clear</button>}
//         </div>
//         {error && <p>{error}</p>}
//         <div className="search-result">
//           {chatHistory.map((chatItem, _index) => <div key={_index}>
//             <p className="answer">
//               <span style={{ color: '#00ffa2', fontWeight: 600 }}>
//                 {chatItem.role.charAt(0).toUpperCase() + chatItem.role.slice(1)} :
//                 </span>
//                               {/* Render markdown content here */}
//               <ReactMarkdown>{chatItem.parts}</ReactMarkdown>
//                 </p>
//           </div>)}
          
//         </div>

//     </div>
//   );
// }

// export default App;





