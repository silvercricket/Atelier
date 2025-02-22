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


  //for deployed host
  const db = new Sequelize('reviews','root','my-secret-pw',
     {
      host: '3.143.17.81',
      port: '32771',
      dialect: 'mysql',
      logging: false
    });

    //for local host
  // const db = new Sequelize('reviews','root','my-secret-pw',
  //     {
  //     //  host: '3.143.17.81',
  //      port: '52771:3306',
  //      dialect: 'mysql',
  //      //logging: false
  //    });



  const CharRev = db.define('characteristics_reviews',{//id,characteristicId,reviewId,value
    //id: Sequelize.INTEGER,
    // reviewId: {type: Sequelize.INTEGER},
    // characteristicId: {type: Sequelize.INTEGER},
    value: Sequelize.INTEGER
  }
)
  const Char = db.define('characteristics',{//id,productId,name
    productId: {type: Sequelize.INTEGER, index: true, allowNull:false},

    name: Sequelize.STRING,
  },
  {
    indexes:[{unique: false, fields:['productId']}]//take a look at this later
  })

  const Picture = db.define('pictures',{//id,reviewId,url
    //id: {type: Number, unique: true},
    // reviewId: {type: Sequelize.INTEGER},
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
    reported: Sequelize.BOOLEAN,
    reviewer_email: Sequelize.STRING,
    productId: {type: Sequelize.INTEGER, index: true, allowNull:false}

  },
  {
    indexes:[{unique: false, fields:['productId']}]//take a look at this later
  })

  // Review.hasMany(CharRev,{
  //   foreignKey: 'reviewId'
  // });
  // // Picture.belongsTo(Review,{
  // //   foreignKey:'reviewId'
  // // });

  // CharRev.belongsTo(Review, {
  //   foreignKey: 'reviewId'
  // });
  // Char.associate = (models) =>{
  //   CharRev.belongsTo(models.Char, {
  //     foreignKey: 'characteristicId'
  //   });
  //   Char.hasOne(models.CharRev,{
  //     foreignKey: 'characteristicId'
  //   });
  // }


  // Review.hasMany(CharRev,{
  //   sourceKey: 'id',
  //   foreignKey: 'reviewId'
  // });
  // Review.hasMany(Picture,{
  //   sourceKey: 'id',
  //   foreignKey: 'reviewId'
  // });

  // // Picture.belongsTo(Review,{
  // //   through:'reviewId',
  // //   targetKey: 'id'
  // // });
  // Review.sync();
  // Char.sync();
  // CharRev.sync();

  // Picture.sync();


  exports.db = db;
  exports.CharRev = CharRev;
  exports.Char = Char;
  exports.Picture = Picture;
  exports.Review = Review;
