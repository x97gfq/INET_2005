// proxy-server-template.js

// Import required modules
const express = require('express');
const axios = require('axios');

const app = express();
const PORT = 3001;

// 🔌 Plug-and-Play Proxy Server Template
// This proxy fetches data from a public API and reshapes the response
// Students can replace the API URL and customize the response structure

app.get('/api/objects', async (req, res) => {
  try {
    // 🌐 STEP 1: Define the external API URL
    // Replace this with any public API endpoint you want to proxy
    const apiUrl = 'https://api.restful-api.dev/objects';

    // 📦 STEP 2: Forward query parameters from client to external API (if needed)
    // Example: /api/objects?id=1 will be passed as ?id=1 to the external API
    const response = await axios.get(apiUrl, { params: req.query });

    // 🔄 STEP 3: Reshape the response for loose coupling
    // This maps the external API's structure to your own internal format
    const reshapedData = response.data.map(item => ({
      id: item.id,
      name: item.name,
      hardwareType: item.data?.type || 'unknown',
      cpu: item.data?.cpu || 'N/A',
      memory: item.data?.memory || 'N/A'
    }));

    // ✅ STEP 4: Send the reshaped response to the client
    res.json({
      success: true,
      count: reshapedData.length,
      objects: reshapedData
    });

  } catch (error) {
    // ❌ Error handling
    console.error('Error fetching data:', error.message);
    res.status(500).json({ success: false, message: 'Failed to fetch data from external API.' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Proxy server is running at http://localhost:${PORT}`);
});
