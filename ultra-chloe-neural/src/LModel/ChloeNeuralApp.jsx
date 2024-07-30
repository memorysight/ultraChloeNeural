
import React, { useRef, useEffect, useState, Fragment } from 'react';
import * as tf from "@tensorflow/tfjs";
import * as qna from "@tensorflow-models/qna";
import './ChloeNeuralApp.css';

const ChloeNeuralApp = () => {
  const passageRef = useRef(null);
  const questionRef = useRef(null);
  const [answer, setAnswer] = useState();
  const [model, setModel] = useState(null);

  const loadModel = async () => {
    try {
      const loadedModel = await qna.load();
      setModel(loadedModel);
      console.log('Model Loaded');
    } catch (error) {
      console.error('Error loading QNA model:', error);
      alert('Sorry, there was an issue loading the model. Please try again.');
    }
  };

  useEffect(() => {
    loadModel()
  }, []);

  const aQ = async (e) => {
    if (e.which === 13 && model !== null) {
      console.log('Question Submitted');// asked a question
      const passage = passageRef.current.value; // passage
      const question = questionRef.current.value; // question

      try {
        const answers = await model.findAnswers(question, passage);
        setAnswer(answers);
        console.log(answers);
      } catch (error) {
        console.error('Error querying API:', error);
        alert('Sorry, there was an issue getting your answer. Please try again.');
      }
    }
  };

  return (
    <div>
      <video autoPlay muted loop id="bg-video">
        <source src="JenLips.mp4" type="video/mp4" />
        {/* <source src="Hal9muchBetterFinal2.mp4" type="video/mp4" /> */}
      </video>

      <div className="content">
        <div className="App">
          <header className="App-header">
            {model == null ?
              <div>
                <div>****L=ML***</div>
                <div/>
                <video autoPlay muted loop id="bg-video">
                  <source src="Hal9muchBetterFinal2.mp4" type="video/mp4" />
                </video>
              </div>
              :
              <Fragment>
                <div>
                  <div className='text'>
                    Make me into your perfect entity!
                  </div>
                  <textArea ref={passageRef} rows="30" cols="100"></textArea>
                  <div className='text'>
                    Ask a question
                  </div>
                  <input ref={questionRef} onKeyDownCapture={aQ} size="80"></input>
                  <div className='text'>
                    Answers
                  </div>

                  {answer ? answer.map((ans, idx) => <div className='answer'><b>Answer {idx + 1} - </b>{ans.text} ({ans.score})</div>) : ""}

                </div>
              </Fragment>
            }
          </header>
        </div>
      </div>
    </div>
  )
}

export default ChloeNeuralApp;