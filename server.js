const express = require('express');
const axios = require('axios');
const app = express();

app.use(express.json());

const COLAB_API_URL =  "YOUR_LINK/predict"; // Colab API endpoint

app.post('/chat', async (req, res) => {
    const userInput = req.body.input;

    try {
        const response = await axios.post(COLAB_API_URL, { input: userInput });
        res.send({ reply: response.data.reply });
    } catch (error) {
        res.status(500).send({ error: 'Error communicating with chatbot.' });
    }
});

app.listen(3000, () => {
    console.log('Server running on port 3000');
});
