const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const logger = require('morgan');

require('dotenv').config();

const app = express();

const mongoDB = process.env.ATLAS_URI;
mongoose
  .connect(mongoDB, { useUnifiedTopology: true, useNewUrlParser: true })
  .then(() => console.log('Connected to Database'))
  .catch(err => console.error('An error has occured', err));
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use(cors());
app.use(express.json());
app.use(logger('dev'));

const indexRoute = require('./route/index');
const usersRoute = require('./route/users');
app.use('/', indexRoute);
app.use('/', usersRoute);

const PORT = process.env.port || 5000;
app.listen(PORT, console.log(`Server started on port ${PORT}`));
