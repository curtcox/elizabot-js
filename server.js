const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

// Serve static files
app.use(express.static(__dirname));

// Create a route for the comparison page
app.get('/compare', (req, res) => {
  res.sendFile(path.join(__dirname, 'compare.html'));
});

// Default route redirects to the comparison page
app.get('/', (req, res) => {
  res.redirect('/compare');
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
  console.log(`Compare page available at http://localhost:${port}/compare`);
});