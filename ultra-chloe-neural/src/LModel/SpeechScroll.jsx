if (recognizer.continuous) {
    recognizer.continuous = true;
  }
  recognizer.interimResults = true; // we want partial result
  recognizer.lang = 'en-US'; // set language
  recognizer.maxAlternatives = 2; // number of alternatives for the recognized speech


  var scrollerClass = '.scroller'

// try to get SpeechRecognition
try {
  var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition || null;
}
catch(err) {
  console.error('Starting Web Speech API Error:', err.message);
  var SpeechRecognition = null;
}

/**
* Initialize the Speech Recognition functions
*/
function startSpeechRecognier () {
  // state used to to start and stop the detection
  var state = {
    'listening': false,
    'started': false,
  };
  var scroller = document.querySelector(scrollerClass); // button to start and stop the recognizer
  var recognizer = new SpeechRecognition();

  // set recognizer to be continuous
  if (recognizer.continuous) {
    recognizer.continuous = true;
  }
  recognizer.interimResults = true; // we want partial result
  recognizer.lang = 'en-US'; // set language
  recognizer.maxAlternatives = 2; // number of alternatives for the recognized speech

  recognizer.onstart = function () {
    // listening started
    state.started = true;
    scroller.innerHTML = 'listening';
    console.log('onstart');
  };

  scroller.onclick = function () {
    if (state.listening === false) {
      try {
        state.listening = true;
        // start recognizer
        recognizer.start();
        console.log('start clicked');
        // if after 3 seconds it doesn't start stop and show message to user
        setTimeout(function () {
          if(!state.started && state.listening) {
            scroller.click();
            alert('Web Speech API seems to not be working. Check if you gave permission to access the microphone or try with another browser.');
          }
        }, 3000)
      } catch(ex) {
        console.log('Recognition error: ' + ex.message);
        alert('Failed to start recognizer.');
      }
    } else {
      state.listening = false;
      state.started = false;
      // stop recognizer
      recognizer.stop();
      scroller.innerHTML = 'scroller';
      console.log('stop clicked');
    }
  }

}

function init () {
  // initialize speechRecognition if supported
  if (SpeechRecognition === null) {
    alert('Web Speech API is not supported.');
  } else {
    startSpeechRecognier();
    console.log('initialized...');
  }
}

window.addEventListener('load', function() {
  init();
}, false);



recognizer.onresult = function (event) {
    // got results
    // the event holds the results
    if (typeof(event.results) === 'undefined') {
        // something went wrong...
        recognizer.stop();
        return;
    }
  
    for (var i = event.resultIndex; i < event.results.length; ++i) {
      if(event.results[i].isFinal) {
        // get all the final detected text into an array
        var results = [];
        for(var j = 0; j < event.results[i].length; ++j) {
          // how confidente (between 0 and 1) is the service that the transcription is correct
          var confidence = event.results[i][j].confidence.toFixed(4);
          // the resuting transcription
          var transcript = event.results[i][j].transcript;
          results.push({ 'confidence': confidence, 'text': transcript });
        }
  
        console.log('Final results:', results);
      } else {
        // got partial result
        console.log('Partial:', event.results[i][0].transcript, event.results[i].length);
      }
    }
  };



  recognizer.onend = function () {
    // listening ended
    console.log('onend');
    if (state.listening) {
      recognizer.start();
    }
  };
  
  recognizer.onerror = function (error) {
    // an error occurred
    console.log('onerror:', error);
  };
  
  recognizer.onspeechend = function () {
    // stopped detecting speech
    console.log('Speech has stopped being detected');
    scroller.innerHTML = 'wait';
  };



  // scroll according to detected command
var scroll = sortByConfidence(results).shift();
console.log('Final results:', results, scroll);
autoScroll(scroll);



/**
* Returns an list ordered by confidence values, descending order.
* @param {array} list - A list of objects containing the confidence and transcript values.
* @return array - Ordered list
*/
function sortByConfidence(list) {
    list.sort(function(a, b) {
      return a.confidence - b.confidence;
    }).reverse();
    var sortedResult = list.map(function(obj) {
      return obj.text;
    });
    return sortedResult;
  }
  
  /**
   * Execute the command if it matches the inputed.
   *
   * @param {String} speech The command to evaluate
   */
  function autoScroll (speech) {
    var body = document.body,
      html = document.documentElement;
    var pageHeight = Math.max(body.scrollHeight, body.offsetHeight,
      html.clientHeight, html.scrollHeight, html.offsetHeight);
    var currentHeight = Math.max(body.scrollTop, html.scrollTop, window.pageYOffset)
  
    if (typeof speech === 'string' || speech instanceof String) {
  
      if (speech.indexOf('up') > -1) {
        console.log('Scrolling up...')
        window.scrollTo({
          top: currentHeight - 250,
          behavior: 'smooth'
        })
      } else if (speech.indexOf('down') > -1) {
        console.log('Scrolling down...')
        window.scrollTo({
          top: currentHeight + 250,
          behavior: 'smooth'
        })
      } else if (speech.indexOf('top') > -1) {
        console.log('Scrolling top...')
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        })
      } else if (speech.indexOf('bottom') > -1) {
        console.log('Scrolling bottom...')
        window.scrollTo({
          top: pageHeight,
          behavior: 'smooth'
        })
      }
    }
  }