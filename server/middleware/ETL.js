require('dotenv').config();
const express = require('express');
const path = require('path');
const axios = require('axios');
var mysql = require('mysql2');
var Sequelize = require('sequelize');

const {TReviews} = require('./ETLparts/reviews.js');
const {TChars} = require('./ETLparts/characteristics.js');
const {TCharsRevs} = require('./ETLparts/characteristics_reviews.js');
const {TPhotos} = require('./ETLparts/photos.js');
const fs = require('fs');
const {parse} = require('csv-parse');
//const filepath = require('./oldData');
const filepathChars = '/oldData/characteristics.csv';
const filepathCharsRevs = '/oldData/characteristic_reviews.csv';
const filepathPhotos = './oldData/reviews_photos.csv';
const filepathRevs = './oldData/reviews.csv';




//TChars();

// TCharsRevs();

TReviews()
.then(()=>{
  TChars()
  .then(()=>{
    TCharsRevs()
    .then(()=>{
      TPhotos()
    })
  })
  }
)




// TCharsRevs()
// .then(TPhotos())

// TReviews()
// .then(()=>{
//   return TChars();
// })
// .then(()=>{
//   return TCharsRevs();
// })
// .then(()=>{
//   return TPhotos();
// })
// const {db, Char, CharRev, Picture, Review} = require('./schemaSequelize.js');


//   const PROCESS_LIMIT = 100000;
//   var process = 0;

//   const readRevsStream = fs.createReadStream(path.join(__dirname,filepathRevs))
//   .pipe(parse({delimiter: ',', from_line: 2}));

//   const readCharStream = fs.createReadStream(path.join(__dirname,filepathChars))
//   .pipe(parse({delimiter: ',', from_line: 2}));

//   const readCharRevStream = fs.createReadStream(path.join(__dirname,filepathCharsRevs))
//   .pipe(parse({delimiter: ',', from_line: 2}));

//   const readPicturesStream = fs.createReadStream(path.join(__dirname,filepathPhotos))
//   .pipe(parse({delimiter: ',', from_line: 2}));


//   var data = [];
//   var dataPass = [];
//   console.log('sending data to database');


//   readRevsStream.on('data', async (row)=>{
//     var reccomended = true;

//     if(row[6] === 'true')
//       reccomended = true;
//     else
//       reccomended = false;
//     data.push({
//       id:row[0],
//       product_id:row[1],
//       rating:row[2],
//       createdAt:new Date(Number(row[3])),
//       summary:row[4],
//       body:row[5],
//       reccommend:reccomended,
//       reported:row[7],
//       reviewer_name:row[8],
//       reviewer_email:row[9],
//       response:row[10],
//       helpfullness:parseInt(row[11])
//     });
//     if(data.length === PROCESS_LIMIT){
//       dataPass = data.slice();
//       data = [];
//       Review.bulkCreate(dataPass);
//     }


//   })
//   .on('end', ()=>{
//     dataPass = data.slice();
//     data = [];
//     Review.bulkCreate(dataPass);
//     console.log('reviews stored');
//     readCharStream.on('data', (row)=>{
//       data.push({id:row[0],product_id:row[1],name:row[2]});
//       if(data.length === PROCESS_LIMIT){
//         dataPass = data.slice();
//         data = [];
//         Char.bulkCreate(dataPass);
//       }
//     })
//     .on('end', ()=>{
//       dataPass = data.slice();
//       data = [];
//       Char.bulkCreate(dataPass);
//       console.log('characteristics stored');
//       readCharRevStream.on('data', (row)=>{
//         data.push({id:row[0],characteristicId:row[1],reviewId:row[2],value:row[3]});
//         if(data.length === PROCESS_LIMIT){
//           dataPass = data.slice();
//           data = [];
//           CharRev.bulkCreate(dataPass);
//         }
//       })
//       .on('end', ()=>{
//         dataPass = data.slice();
//         data = [];
//         CharRev.bulkCreate(dataPass);
//         console.log('two down!');
//         readPicturesStream.on('data', (row)=>{
//           data.push({id:row[0],reviewId:row[1],url:row[2]});
//           if(data.length === PROCESS_LIMIT){
//             dataPass = data.slice();
//             data = [];
//             Picture.bulkCreate(dataPass);
//           }
//         })
//         .on('end', ()=>{
//           dataPass = data.slice();
//           data = [];
//           Picture.bulkCreate(dataPass);
//           console.log('now for the tough one...');
//           var reccomended = false;

//         })

//       })
//     })
//   })

















//   readCharStream.on('data', (row)=>{
//     data.push({id:row[0],product_id:row[1],name:row[2]});
//     if(data.length === PROCESS_LIMIT){
//       dataPass = data.slice();
//       data = [];
//       Char.bulkCreate(dataPass);
//     }
//   })
//   .on('end', ()=>{
//     dataPass = data.slice();
//     data = [];
//     Char.bulkCreate(dataPass);
//     console.log('characteristics stored');
//     readCharRevStream.on('data', (row)=>{
//       data.push({id:row[0],characteristicId:row[1],reviewId:row[2],value:row[3]});
//       if(data.length === PROCESS_LIMIT){
//         dataPass = data.slice();
//         data = [];
//         CharRev.bulkCreate(dataPass);
//       }
//     })
//     .on('end', ()=>{
//       dataPass = data.slice();
//       data = [];
//       CharRev.bulkCreate(dataPass);
//       console.log('two down!');
//       readPicturesStream.on('data', (row)=>{
//         data.push({id:row[0],reviewId:row[1],url:row[2]});
//         if(data.length === PROCESS_LIMIT){
//           dataPass = data.slice();
//           data = [];
//           Picture.bulkCreate(dataPass);
//         }
//       })
//       .on('end', ()=>{
//         dataPass = data.slice();
//         data = [];
//         Picture.bulkCreate(dataPass);
//         console.log('now for the tough one...');
//         var reccomended = false;
//         readRevsStream.on('data', async (row)=>{
//           if(row[6] === 'true')
//             reccomended = true;
//           else
//             reccomend = false;
//           data.push({
//             id:row[0],
//             product_id:row[1],
//             rating:row[2],
//             createdAt:row[3],
//             summary:row[4],
//             body:row[5],
//             reccommend:reccomended,
//             reported:row[7],
//             reviewer_name:row[8],
//             reviewer_email:row[9],
//             response:row[10],
//             helpfullness:parseInt(row[11])
//           });
//           if(data.length === PROCESS_LIMIT){
//             dataPass = data.slice();
//             data = [];
//             Review.bulkCreate(dataPass);
//           }


//         })
//         .on('end', ()=>{
//           dataPass = data.slice();
//           data = [];
//           Review.bulkCreate(dataPass);
//           console.log('that should be all');
//         })
//       })

//     })
//   })




