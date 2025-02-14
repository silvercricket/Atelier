require('dotenv').config();
const express = require('express');
const path = require('path');
const axios = require('axios');
var mysql = require('mysql2');
var Sequelize = require('sequelize');
const fs = require('fs');
const {parse} = require('csv-parse');
//const filepath = require('./oldData');

const filepathPhotos = '../oldData/reviews_photos.csv';


const {Picture} = require('./../schemaSequelize.js');


  const PROCESS_LIMIT = 100000;
  var process = 0;




  var data = [];
  var dataPass = [];
  console.log('sending data to database');

  TPhotos= async()=>{
    return new Promise((resolve,reject)=>{
      const readPicturesStream = fs.createReadStream(path.join(__dirname,filepathPhotos))
      .pipe(parse({delimiter: ',', from_line: 2}));
      readPicturesStream.on('data', (row)=>{

        data.push({id:Number(row[0]),review_id:Number(row[1]),url:row[2]});
        if(data.length === PROCESS_LIMIT){
          dataPass = data.slice();
          data = [];
          Picture.bulkCreate(dataPass);
        }
      })
      .on('end', ()=>{
        dataPass = data.slice();
        data = [];
        Picture.bulkCreate(dataPass)
        .then(()=>{resolve('resovled')})
        .catch((err)=>{reject(err)})
      })
    })
  }



  exports.TPhotos = TPhotos;








