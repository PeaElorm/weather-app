// Import the 'node-fetch' library for making HTTP requests in Node.js
const fetch = require("node-fetch");

// Define the API route handler
export default async (req, res) => {
  // Extract the latitude, longitude, and API key from the request query parameters
  const { lat, lon, appid } = req.query;

  // Construct the URL for the OpenWeatherMap API request using the latitude, longitude, and API key
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${appid}`;

  try {
    // Make an HTTP request to the OpenWeatherMap API using 'fetch'
    const response = await fetch(apiUrl);

    // Parse the response body as JSON
    const data = await response.json();

    // Respond with the weather data as a JSON response with status code 200 (OK)
    res.status(200).json(data);
  } catch (error) {
    // If there is an error during the API request, respond with a JSON response with status code 500 (Internal Server Error)
    res.status(500).json({ error: "Error fetching weather data" });
  }
};
