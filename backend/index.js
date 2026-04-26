const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// Enable CORS for frontend-backend communication
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  next();
});

app.get('/', (req, res) => {
  res.json({ message: 'Welcome to Venture When Backend!' });
});

// Dummy data endpoint
app.get('/api/dummy-data', (req, res) => {
  const dummyData = {
    title: "Venture When - Tourism & Weather App",
    description: "Your ultimate companion for planning perfect trips based on weather conditions",
    features: [
      {
        id: 1,
        name: "Weather Forecasting",
        description: "Get accurate weather predictions for your destination"
      },
      {
        id: 2,
        name: "Tourist Attractions",
        description: "Discover amazing places to visit in your chosen location"
      },
      {
        id: 3,
        name: "Trip Planning",
        description: "Plan your itinerary with weather-based recommendations"
      }
    ],
    currentWeather: {
      location: "Sample City",
      temperature: 25,
      condition: "Sunny",
      humidity: 65,
      windSpeed: 10
    },
    timestamp: new Date().toISOString()
  };
  res.json(dummyData);
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});