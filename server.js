require("dotenv").config();
const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());  // Allow requests from any origin
app.use(express.json());  // Parse JSON request body

// Forward request to Blynk API
app.get("/blynk/:token/pin/:pin", async (req, res) => {
    const { token, pin } = req.params;
    const blynkUrl = `https://blynk.cloud/external/api/get?token=${token}&pin=${pin}`;
    //const blynkUrl = `https://192.168.1.103:9443/n4uICWW8guhAulM_Rwe2bG8hjcP3TzMB/update/V1?value=1';

    try {
        const response = await axios.get(blynkUrl);
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Route to set a pin value
app.get("/blynk/:token/set/:pin/:value", async (req, res) => {
    const { token, pin, value } = req.params;
    const blynkUrl = `https://blynk.cloud/external/api/update?token=${token}&${pin}=${value}`;

    try {
        const response = await axios.get(blynkUrl);
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
