require('dotenv').config();
const express = require('express');
const path = require('path');
const axios = require('axios');

module.exports = (req, res, next) => {
  const header = process.env.AUTH_KEY;
  const headers = req.headers;
  const type = req.method;
  const endpoint = req.url;
  const body = req.body;
  console.log(endpoint);
  axios({
    method: type,
    url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp${endpoint}`,
    headers: { Authorization : header }
  }).then((results) => {
    console.log('RESULTS: ', results.data);
    res.send(results.data);
    next();
  }).catch(() => {
    console.error('failed');
    next();
  });
}

// app.use((req, res, next) => {
//   res.set({
//     'X-Powered-By': 'Express', // Set a custom header
//     'Content-Type': 'application/json', // Set the content type
//   });

