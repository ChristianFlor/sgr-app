const express = require('express');
const fetch = require('node-fetch');
const path = require('path');
const fs = require('fs');
const cors = require('cors');

require('dotenv').config();
const app = express();
const PORT = 3000;
const savedPrompts = [];

app.use(express.static(__dirname));

app.use(cors());

app.use(express.json());



app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});


app.post('/get-response', async (req, res) => {
    const userInput = req.body.prompt;
    const API_KEY = process.env.OPENAI_API_KEY; 
    const dataToSend = {
        model: "gpt-3.5-turbo-16k",
        messages: [
            { role: "system", content: "Eres un asistente que dará respuesta a niños entre 9 a 10 años" }, 
            { role: "user", content: userInput }
        ]
    };

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${API_KEY}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(dataToSend)
    });
    
    const data = await response.json();
    
    res.json(data);
});

app.post('/save-prompt', (req, res) => {
    const promptValue = req.body.prompt;
    savedPrompts.push(promptValue);
    console.log(savedPrompts);
    res.json({ message: "Prompt saved successfully!" });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
