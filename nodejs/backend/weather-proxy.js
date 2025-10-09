// server.js
const express = require('express');
const axios = require('axios');
const app = express();
const PORT = 3001;

//Test with:
//http://localhost:3001/weather?latitude=44.65&longitude=-63.57

app.get('/weather', async (req, res) => {
  const { latitude, longitude } = req.query;

  if (!latitude || !longitude) {
    return res.status(400).json({ error: 'Missing latitude or longitude parameters' });
  }

  const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true&timezone=auto`;

  try {
    const response = await axios.get(weatherUrl);

    //console.log(weatherUrl, response);

    const weather = response.data.current_weather;

    res.json({
      temperature: weather.temperature,
      windSpeed: weather.windspeed,
      windDirection: weather.winddirection,
      weatherCode: weather.weathercode,
      time: weather.time
    });
    
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch weather data', details: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Weather proxy server running at http://localhost:${PORT}`);
});