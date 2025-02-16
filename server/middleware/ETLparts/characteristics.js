require('dotenv').config();
const express = require('express');
const path = require('path');
const axios = require('axios');
var mysql = require('mysql2');
var Sequelize = require('sequelize');
const fs = require('fs');
const {parse} = require('csv-parse');
//const filepath = require('./oldData');
const filepathChars = '../oldData/characteristics_stub.csv';
const filepathCharsRevs = '../oldData/characteristic_reviews.csv';
const filepathPhotos = '../oldData/reviews_photos.csv';
const filepathRevs = '../oldData/reviews.csv';

const {Char} = require('./../schemaSequelize.js');


  const PROCESS_LIMIT = 100000;
  var process = 0;



  var data = [];
  var dataPass = [];
  console.log('sending data to database');

  TChars= async()=>{
    return new Promise((resolve,reject)=>{
      const readCharStream = fs.createReadStream(path.join(__dirname,filepathChars))
      .pipe(parse({delimiter: ',', from_line: 2}));
      readCharStream.on('data', (row)=>{
        data.push({id:Number(row[0]),productId:Number(row[1]),name:row[2]});
        if(data.length === PROCESS_LIMIT){
          dataPass = data.slice();
          data = [];
          Char.bulkCreate(dataPass);
        }
      })
      .on('end', ()=>{
        dataPass = data.slice();
        data = [];
        Char.bulkCreate(dataPass)
        .then(()=>{resolve('resovled')})
        .catch((err)=>{reject(err)})
        console.log('characteristics stored');
      })
    })
  }



  exports.TChars = TChars;








