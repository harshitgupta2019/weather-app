const express = require('express');
const axios = require('axios');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.post('/getWeather', async (req, res) => {
  try {
    const { cities } = req.body;
    const weatherData = await getWeatherData(cities);
    res.json({ weather: weatherData });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

async function getWeatherData(cities) {
  const apiKey = 'ddb2d7c9ab904cb822fba9e7c45463fa'; // Replace with your actual API key
  const weatherData = {};

  for (const city of cities) {
    try {
      const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
      const temperature = response.data.main.temp.toFixed(1);
      weatherData[city] = `${temperature}°C`;
    } catch (error) {
      weatherData[city] = 'N/A';
    }
  }

  return weatherData;
}

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
