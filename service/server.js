// require('dotenv').config();
// const express = require('express');
// const { connectDB } = require('./database/MongoDB');
// const apiRoutes = require('./routes/api.routes');
// const requestTrackerMiddleware = require('./middleware/RequestTracker.middleware');

// const app = express();

// app.use(express.json()); // Parse JSON requests

// // Middleware for logging requests
// app.use(requestTrackerMiddleware);

// // Routes
// app.use('/api', apiRoutes);

// // Healthcheck route
// app.get('/healthcheck', (req, res) => res.send('Server is healthy'));

// // Start server and connect to DB
// connectDB().then(() => {
//   app.listen(process.env.PORT || 4000, () => console.log(`Server running on port ${process.env.PORT || 4000}`));
// });
require('dotenv').config();
const express = require('express');
const { requestTracker } = require('../shared/Middleware');


const app = express();


const apiRoutes = require('./routes/api.routes');


app.use(express.json());
app.use(requestTracker); // Middleware for logging requests.

app.use('/api/user', apiRoutes);
// Healthcheck route
app.get('/healthcheck', (req, res) => res.send('Server is healthy'));
app.listen(process.env.PORT || 3000, () => console.log(`Server running on port ${process.env.PORT || 3000}`));
