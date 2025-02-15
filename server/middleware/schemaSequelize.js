require('dotenv').config();
const express = require('express');
const path = require('path');
const axios = require('axios');
var mysql = require('mysql2');
var Sequelize = require('sequelize');
const fs = require('fs');
const {parse} = require('csv-parse');
//const filepath = require('./oldData');
const filepathChars = '/oldData/characteristics.csv';
const filepathCharsRevs = '/oldData/characteristic_reviews.csv';
const filepathPhotos = './oldData/reviews_photos.csv';
const filepathRevs = './oldData/reviews.csv';



  const db = new Sequelize('reviews','root','my-secret-pw',
     {
      port: '52771:3306⁠',
      dialect: 'mysql',
      logging: false
    });



  const CharRev = db.define('characteristics_reviews',{//id,characteristic_id,review_id,value
    //id: Sequelize.INTEGER,
    review_id: {type: Sequelize.INTEGER},
    characteristic_id: {type: Sequelize.INTEGER},
    value: Sequelize.INTEGER
  }
)
  const Char = db.define('characteristics',{//id,product_id,name
    product_id: {type: Sequelize.INTEGER, index: true, allowNull:false},

    name: Sequelize.STRING,
  },
  {
    indexes:[{unique: false, fields:['product_id']}]//take a look at this later
  })

  const Picture = db.define('pictures',{//id,review_id,url
    //id: {type: Number, unique: true},
    review_id: {type: Sequelize.INTEGER},
    url: Sequelize.STRING
  })

  const Review = db.define('reviews',{
    //id: {type: Number, unique: true},
    body: Sequelize.STRING(1000),
    summary: Sequelize.STRING,
    helpfullness: Sequelize.STRING,
    reviewer_name: Sequelize.STRING,
    response: Sequelize.STRING,
    reccomend: Sequelize.BOOLEAN,
    reviewer_email: Sequelize.STRING,
    product_id: {type: Sequelize.INTEGER, index: true, allowNull:false}

  },
  {
    indexes:[{unique: false, fields:['product_id']}]//take a look at this later
  })



  exports.db = db;
  exports.CharRev = CharRev;
  exports.Char = Char;
  exports.Picture = Picture;
  exports.Review = Review;
