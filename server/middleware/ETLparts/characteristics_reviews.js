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
const filepathCharsRevs = '../oldData/characteristic_reviews.csv';
const filepathPhotos = '../oldData/reviews_photos.csv';
const filepathRevs = '../oldData/reviews.csv';

const {CharRev} = require('./../schemaSequelize.js');


  const PROCESS_LIMIT = 100000;
  var process = 0;




  var data = [];
  var dataPass = [];
  console.log('sending data to database');

  TCharsRevs= async()=>{
    return new Promise((resolve,reject)=>{
      const readCharRevStream = fs.createReadStream(path.join(__dirname,filepathCharsRevs))
      .pipe(parse({delimiter: ',', from_line: 2}));
      readCharRevStream.on('data', (row)=>{
        data.push({id:Number(row[0]),characteristic_id:Number(row[1]),review_id:Number(row[2]),value:Number(row[3])});
        if(data.length === PROCESS_LIMIT){
          dataPass = data.slice();
          data = [];
          CharRev.bulkCreate(dataPass);
        }
      })
      .on('end', ()=>{
        dataPass = data.slice();
        data = [];
        CharRev.bulkCreate(dataPass)
        .then(()=>{resolve('resovled')})
        .catch((err)=>{reject(err)})
      })
    })
  }


  exports.TCharsRevs = TCharsRevs;








