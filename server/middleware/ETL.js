require('dotenv').config();
const express = require('express');
const path = require('path');
const axios = require('axios');
var mysql = require('mysql2');
var Sequelize = require('sequelize');

const {TReviews} = require('./ETLparts/reviews.js');
const {TChars} = require('./ETLparts/characteristics.js');
const {TCharsRevs} = require('./ETLparts/characteristics_reviews.js');
const {TPhotos} = require('./ETLparts/photos.js');
const fs = require('fs');
const {parse} = require('csv-parse');
//const filepath = require('./oldData');
const filepathChars = '/oldData/characteristics_stub.csv';
const filepathCharsRevs = '/oldData/characteristic_reviews_stub.csv';
const filepathPhotos = './oldData/reviews_photos_stub.csv';
const filepathRevs = './oldData/reviews_stub.csv';




//TChars();

// TCharsRevs();

TReviews()
.then(()=>{
  TChars()
  .then(()=>{
    TCharsRevs()
    .then(()=>{
      TPhotos()
    })
  })
  }
)

