const express = require('express');
const fetch = require('node-fetch');
const path = require('path');
const cors = require('cors');
const app = express();
const PORT = 3000;

app.use(express.static('sgr-app'));
// Usa middleware CORS para permitir solicitudes de cualquier origen
app.use(cors());

app.use(express.json());



app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.post('/get-response', async (req, res) => {
    const prompt = req.body.prompt;
    const API_KEY = process.env.OPENAI_API_KEY; // Usa una variable de entorno para tu clave API
    const response = await fetch("https://api.openai.com/v1/engines/davinci/completions", {
        method: "POST",
        headers: {
            "Authorization": `Bearer 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`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            prompt: prompt,
            max_tokens: 200
        })
    });

    const data = await response.json();
    res.json(data);
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
