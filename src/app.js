const express = require('express');
const userRoutes = require('./modules/user/routes/user.routes');
const meetingRoutes = require('./modules/meeting/routes/meeting.routes');

const app = express();
app.use(express.json());

app.use('/users', userRoutes);
app.use('/meetings', meetingRoutes);

module.exports = app;
