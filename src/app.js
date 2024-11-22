const express = require('express');
const usersRouter = require('./routes/users');
const destinationsRouter = require('./routes/destinations');
const historyRouter = require('./routes/history');
const recommendationsRouter = require('./routes/recommendations');

const app = express();

app.use(express.json());

// Tambahkan routes
app.use('/api', usersRouter);
app.use('/api', destinationsRouter);
app.use('/api', historyRouter);
app.use('/api', recommendationsRouter);

module.exports = app;
