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
const filepathCharsRevs = '../oldData/characteristic_reviews_stub.csv';
const filepathPhotos = '../oldData/reviews_photos_stub.csv';
const filepathRevs = '../oldData/reviews.csv';

const {Review} = require('./../schemaSequelize.js');


  const PROCESS_LIMIT = 100000;
  var process = 0;




  var data = [];
  var dataPass = [];
  console.log('sending data to database');

  TReviews= async()=>{
    return new Promise((resolve,reject)=>{
      const readRevsStream = fs.createReadStream(path.join(__dirname,filepathRevs))
      .pipe(parse({delimiter: ',', from_line: 2}));
      readRevsStream.on('data', async (row)=>{
        var reccomended = true;

        if(row[6] === 'true')
          reccomended = true;
        else
          reccomended = false;
        data.push({
          id:Number(row[0]),
          productId:Number(row[1]),
          rating:row[2],
          createdAt:new Date(Number(row[3])),
          summary:row[4],
          body:row[5],
          reccommend:reccomended,
          reported:row[7],
          reviewer_name:row[8],
          reviewer_email:row[9],
          response:row[10],
          helpfullness:parseInt(row[11])
        });
        if(data.length === PROCESS_LIMIT){
          dataPass = data.slice();
          data = [];
          Review.bulkCreate(dataPass);
        }


      })
      .on('end', ()=>{
        dataPass = data.slice();
        data = [];
        Review.bulkCreate(dataPass)
        .then(()=>{resolve('resovled')})
        .catch((err)=>{reject(err)})


      })
    })
  }



  exports.TReviews = TReviews;








