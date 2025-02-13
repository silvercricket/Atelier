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

const {db, Char, CharRev, Picture, Review} = require('./schemaSequelize.js');

  // const CharsRevs = mongoose.model('CharsRevs', CharsRevsSchema);
  // const Chars = mongoose.model('Chars',CharsSchema);
  // const Pictures = mongoose.model('Pictures',PicturesSchema);
  // const Reviews = mongoose.model('Reviews',ReviewSchema);
  const PROCESS_LIMIT = 100000;
  var process = 0;

  const readCharStream = fs.createReadStream(path.join(__dirname,filepathChars))
  .pipe(parse({delimiter: ',', from_line: 2}));

  const readCharRevStream = fs.createReadStream(path.join(__dirname,filepathCharsRevs))
  .pipe(parse({delimiter: ',', from_line: 2}));

  const readPicturesStream = fs.createReadStream(path.join(__dirname,filepathPhotos))
  .pipe(parse({delimiter: ',', from_line: 2}));

  const readRevsStream = fs.createReadStream(path.join(__dirname,filepathRevs))
  .pipe(parse({delimiter: ',', from_line: 2}));
  var data = [];
  var dataPass = [];
  console.log('sending data to database');
  readCharStream.on('data', (row)=>{
    data.push({id:row[0],product_id:row[1],name:row[2]});
    if(data.length === PROCESS_LIMIT){
      dataPass = data.slice();
      data = [];
      Char.bulkCreate(dataPass);
    }
  })
  .on('end', ()=>{
    dataPass = data.slice();
    data = [];
    Char.bulkCreate(dataPass);
    console.log('characteristics stored');
    readCharRevStream.on('data', (row)=>{
      data.push({id:row[0],characteristic_id:row[1],review_id:row[2],value:row[3]});
      if(data.length === PROCESS_LIMIT){
        dataPass = data.slice();
        data = [];
        CharRev.bulkCreate(dataPass);
      }
    })
    .on('end', ()=>{
      dataPass = data.slice();
      data = [];
      CharRev.bulkCreate(dataPass);
      console.log('two down!');
      readPicturesStream.on('data', (row)=>{
        data.push({id:row[0],review_id:row[1],url:row[2]});
        if(data.length === PROCESS_LIMIT){
          dataPass = data.slice();
          data = [];
          Picture.bulkCreate(dataPass);
        }
      })
      .on('end', ()=>{
        dataPass = data.slice();
        data = [];
        Picture.bulkCreate(dataPass);
        console.log('now for the tough one...');
        readRevsStream.on('data', async (row)=>{

          data.push({
            id:row[0],
            product_id:row[1],
            rating:row[2],
            date_:row[3],
            summary:row[4],
            body:row[5],
            recommend:row[6],
            reported:row[7],
            reviewer_name:row[8],
            reviewer_email:row[9],
            response:row[10],
            helpfullness:row[11]
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
          Review.bulkCreate(dataPass);
          console.log('that should be all');
        })
      })

    })
  })




