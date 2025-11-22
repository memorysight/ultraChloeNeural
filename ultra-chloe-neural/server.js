require( 'dotenv').config()

const PORT = 9090
const express = require('express')
const cors = require('cors')
const app = express()
app.use(cors())
app.use(express.json())

console.log("Loaded AWS KEY:", process.env.AWS_ACCESS_KEY_ID);
console.log("Loaded AWS SECRET:", process.env.AWS_SECRET_ACCESS_KEY ? "OK" : "MISSING");

const { PollyClient, SynthesizeSpeechCommand } = require("@aws-sdk/client-polly");


const { GoogleGenerativeAI } = require("@google/generative-ai");

// Access your API key as an environment variable (see "Set up your API key" above)
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

app.listen(PORT, () => console.log(`listening on port ${PORT}`))

app.post('/gemini', async (req, res) => {
    console.log(req.body.history)
    console.log(req.body.message)
    
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash"});

    const chat = model.startChat({
       
        history: req.body.history
    })

    const msg= req.body.message

    const result = await chat.sendMessage(msg)
    const response = await result.response
    const text = response.text()
    res.send(text)
})

const polly = new PollyClient({
    region: "us-east-1",
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
     },
});

// Helpers
async function streamToString(stream) {
    const chunks = [];
    for await (const chunk of stream) {
        chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
    }
    return Buffer.concat(chunks).toString("utf8");
}

async function streamToBuffer(stream) {
    const chunks = [];
    for await (const chunk of stream) {
        chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
    }
    return Buffer.concat(chunks);
}

// Main TTS route
app.post("/tts", async (req, res) => {
    try {
        const { text, voice = "Joanna" } = req.body;
        if (!text) return res.status(400).json({ error: "Text required" });

        // Audio
        const audioCmd = new SynthesizeSpeechCommand({
            OutputFormat: "mp3",
            Text: text,
            VoiceId: voice,
            Engine: "neural",
        });
        const audioRes = await polly.send(audioCmd);
        const audioBuf = await streamToBuffer(audioRes.AudioStream);
        const audioBase64 = audioBuf.toString("base64");

        // Visemes
        const marksCmd = new SynthesizeSpeechCommand({
            OutputFormat: "json",
            Text: text,
            VoiceId: voice,
            Engine: "neural",
            SpeechMarkTypes: ["viseme"],
        });

        const marksRes = await polly.send(marksCmd);
        const marksStr = await streamToString(marksRes.AudioStream);

        const visemes = marksStr
            .trim()
            .split("\n")
            .map((line) => JSON.parse(line))
            .filter((m) => m.type === "viseme")
            .map((m) => ({
                t: m.time / 1000, // ms → seconds
                id: m.value,
            }));

        res.json({ audioBase64, visemes });
    } catch (err) {
        console.error("Polly error:", err);
        res.status(500).json({ error: err.message });
    }
});



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


// async function run() {
//   // For text-only input, use the gemini-pro model
//   const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"});

//   const chat = model.startChat({
//     history: [
//       {
//         role: "user",
//         parts: [{ text: "Hi Im Daniel.  When is Christmas?" }],
//       },
//       {
//         role: "model",
//         parts: [{ text: "Great to meet you. What would you like to know?" }],
//       },
//     ],
//     generationConfig: {
//       maxOutputTokens: 100,
//     },
//   });

//   const msg = "How many days from now is that?";

  

//   const result = await chat.sendMessage(msg);
//   const response = await result.response;
//   const text = response.text();
// //  console.log(req.body.history)
//   console.log(text);
// }

// run();