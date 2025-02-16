require('dotenv').config();
const express = require('express');
const path = require('path');
const axios = require('axios');
var mysql = require('mysql2');
var Sequelize = require('sequelize');
const fs = require('fs');
const {parse} = require('csv-parse');
//const filepath = require('./oldData');
const filepathChars = '../oldData/characteristics.csv';
const filepathCharsRevs = '../oldData/characteristic_reviews_stub.csv';
const filepathPhotos = '../oldData/reviews_photos.csv';
const filepathRevs = '../oldData/reviews.csv';

const {CharRev,Review,Char} = require('./../schemaSequelize.js');


  const PROCESS_LIMIT = 100000;
  var process = 0;

  Review.hasMany(CharRev,{
    foreignKey: 'reviewId',
    sourceKey: 'id'
  });


  CharRev.belongsTo(Review, {
    through: 'reviewId',
    target: 'id'
  });

  Char.hasOne(CharRev,{
    foreignKey: 'characteristicId',
    sourceKey: 'id'
  });
  CharRev.belongsTo(Char, {
    through: 'characteristicId',
    targetKey: 'id'
  });

  Review.sync();
  Char.sync();
  CharRev.sync();

  var data = [];
  var dataPass = [];
  console.log('sending data to database');

  TCharsRevs= async()=>{
    return new Promise((resolve,reject)=>{
      const readCharRevStream = fs.createReadStream(path.join(__dirname,filepathCharsRevs))
      .pipe(parse({delimiter: ',', from_line: 2}));
      readCharRevStream.on('data', (row)=>{
        data.push({id:Number(row[0]),characteristicId:Number(row[1]),reviewId:Number(row[2]),value:Number(row[3])});
        if(data.length === PROCESS_LIMIT){
          dataPass = data.slice();
          data = [];
          CharRev.bulkCreate(dataPass,{include: [Review,Char]});
        }
      })
      .on('end', ()=>{
        dataPass = data.slice();
        data = [];
        CharRev.bulkCreate(dataPass,{include: [Review,Char]})
        .then(()=>{resolve('resovled')})
        .catch((err)=>{reject(err)})
      })
    })
  }


  exports.TCharsRevs = TCharsRevs;








