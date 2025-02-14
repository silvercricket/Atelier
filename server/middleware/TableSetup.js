require('dotenv').config();
const express = require('express');
const path = require('path');
const axios = require('axios');
var mysql = require('mysql2');
var Sequelize = require('sequelize');
const fs = require('fs');
const {parse} = require('csv-parse');
const {db, Char, CharRev, Picture, Review} = require('./schemaSequelize.js');
//const filepath = require('./oldData');
const filepathChars = '/oldData/characteristics.csv';
const filepathCharsRevs = '/oldData/characteristic_reviews.csv';
const filepathPhotos = './oldData/reviews_photos.csv';
const filepathRevs = './oldData/reviews.csv';

  Review.hasMany(Picture,{
    foreignKey: 'review_id',
  });
  Picture.belongsTo(Review);
  //Review.hasMany(Char);
  //Char.belongsTo(Review);
  Review.hasMany(CharRev,{
    foreignKey: 'review_id',
  });
  CharRev.belongsTo(Review);
  Char.hasMany(CharRev,{
    foreignKey: 'characteristic_id',
  });
  CharRev.belongsTo(Char);

  Review.sync();
  Char.sync();
  CharRev.sync();
  Picture.sync();



  console.log('hello');
  // const CharsRevs = mongoose.model('CharsRevs', CharsRevsSchema);
  // const Chars = mongoose.model('Chars',CharsSchema);
  // const Pictures = mongoose.model('Pictures',PicturesSchema);
  // const Reviews = mongoose.model('Reviews',ReviewSchema);
//}