// const PORT = 8000
// const express = require('express')
// const cors = require('cors')
// const app = express()
// app.use(cors())
// app.use(express.json())
// // require( 'dotenv').config()

// const { GoogleGenerativeAI } = require("@google/generative-ai");

// // Access your API key as an environment variable (see "Set up your API key" above)
// const genAI = new GoogleGenerativeAI('AIzaSyDKUIoWlpmTSWlFnDyJS_zJmcMgXbZg2Og');

// app.listen(PORT, () => console.log(`listening on port ${PORT}`))

// app.post('/gemini', async (req, res) => {
//     console.log(req.body.history)
//     console.log(req.body.message)
    
//     const model = genAI.getGenerativeModel({ model: "gemini-pro"});

//     const chat = model.startChat({
       
//         history: req.body.history
//     })

//     const msg= req.body.message

//     const result = await chat.sendMessage(msg)
//     const response = await result.response
//     const text = response.text()
//     res.send(text)
// })














const PORT = 8000
const express = require('express')
const cors = require('cors')
const app = express()
app.use(cors())
app.use(express.json())
// require( 'dotenv').config()

const { GoogleGenerativeAI } = require("@google/generative-ai");

// Access your API key as an environment variable (see "Set up your API key" above)
const genAI = new GoogleGenerativeAI('AIzaSyDKUIoWlpmTSWlFnDyJS_zJmcMgXbZg2Og');

app.listen(PORT, () => console.log(`listening on port ${PORT}`))


async function run() {
  // For text-only input, use the gemini-pro model
  const model = genAI.getGenerativeModel({ model: "gemini-pro"});

  const chat = model.startChat({
    history: [
      {
        role: "user",
        parts: [{ text: "Hi Im Daniel.  When is Christmas?" }],
      },
      {
        role: "model",
        parts: [{ text: "Great to meet you. What would you like to know?" }],
      },
    ],
    generationConfig: {
      maxOutputTokens: 100,
    },
  });

  const msg = "How many days from now is that?";

  

  const result = await chat.sendMessage(msg);
  const response = await result.response;
  const text = response.text();
//  console.log(req.body.history)
  console.log(text);
}

run();