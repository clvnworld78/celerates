import express from 'express';
import routes from './routes.js';
const app = express();
const port = 3000;

// Middleware to parse JSON request bodies
app.use(express.json());

// Use routes from routes.js
app.use('/', routes);

// Start the server
app.listen(port, () => {
  console.log(`Shipping API is running on http://localhost:${port}`);
});
