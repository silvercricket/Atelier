require('dotenv').config();
const express = require('express');
const path = require('path');
const app = express();
const auth = require('./middleware/authorization.js');
const axios = require('axios')


app.use(express.static(path.join(__dirname, '../client/dist')));
app.use(express.json());

// attach auth key to all routes
app.use('/api/*', auth);

app.listen(3000, () => {
  console.log('currently listening on port 3000');
})