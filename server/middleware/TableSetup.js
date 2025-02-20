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




  Review.hasMany(CharRev,{
    foreignKey: 'reviewId',
    sourceKey: 'id'
  });
  // Picture.belongsTo(Review,{
  //   foreignKey:'reviewId'
  // });

  // CharRev.belongsTo(Review, {
  //   foreignKey: 'reviewId',
  //   sourceKey: 'id'

  // });
  Char.hasOne(CharRev,{
    foreignKey: 'characteristicId',
    sourceKey: 'id'
  });
  CharRev.belongsTo(Char, {
    sourceKey: 'characteristicId',
    targetKey: 'id'
  });



  Review.hasMany(CharRev,{
    sourceKey: 'id',
    foreignKey: 'reviewId'
  });
  CharRev.belongsTo(Review, {
    sourceKey: 'reviewId',
    targetKey: 'id'
  })
  Review.hasMany(Picture,{
    sourceKey: 'id',
    foreignKey: 'reviewId'
  });

  // Picture.belongsTo(Review,{
  //   through:'reviewId',
  //   targetKey: 'id'
  // });
  Review.sync();
  Char.sync();
  CharRev.sync();

  Picture.sync();


