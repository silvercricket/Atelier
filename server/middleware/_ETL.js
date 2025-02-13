require('dotenv').config();
const express = require('express');
const path = require('path');
const axios = require('axios');
const mongoose = require('mongoose');
const fs = require('fs');
const {parse} = require('csv-parse');
//const filepath = require('./oldData');
const filepathChars = '/oldData/characteristics.csv';
const filepathCharsRevs = '/oldData/characteristic_reviews.csv';
const filepathPhotos = './oldData/reviews_photos.csv';
const filepathRevs = './oldData/reviews.csv';

module.exports = async function () {

  mongoose.connect('mongodb://localhost:27017/Reviews');


  const CharsRevsSchema = new mongoose.Schema({//id,characteristic_id,review_id,value
    id: {type: Number, unique: true},
    review_id: Number,
    characteristic_id: Number,
    value: String
  })
  const CharsSchema = new mongoose.Schema({//id,product_id,name
    id: {type: Number, unique: true},
    product_id: Number,
    name: String
  })
  const PicturesSchema = new mongoose.Schema({//id,review_id,url
    id: {type: Number, unique: true},
    review_id: Number,
    url: String
  })

  const ReviewSchema = new mongoose.Schema({
    id: {type: Number, unique: true},
    body: String,
    summary: String,
    helpfullness: String,
    date: Date,
    reviewer_name: String,
    response: String,
    reccomend:Boolean,
    reviewer_email: String,
    product_id: Number

  })


  const CharsRevs = mongoose.model('CharsRevs', CharsRevsSchema);
  const Chars = mongoose.model('Chars',CharsSchema);
  const Pictures = mongoose.model('Pictures',PicturesSchema);
  const Reviews = mongoose.model('Reviews',ReviewSchema);
  const PROCESS_LIMIT = 100000;
  var process = 0;

  // const readCharStream = fs.createReadStream(path.join(__dirname,filepathChars))
  // .pipe(parse({delimiter: ',', from_line: 2}));

  // const readCharRevStream = fs.createReadStream(path.join(__dirname,filepathCharsRevs))
  // .pipe(parse({delimiter: ',', from_line: 2}));

  // const readPicturesStream = fs.createReadStream(path.join(__dirname,filepathPhotos))
  // .pipe(parse({delimiter: ',', from_line: 2}));

  const readRevsStream = fs.createReadStream(path.join(__dirname,filepathRevs))
  .pipe(parse({delimiter: ',', from_line: 2}));

  console.log('sending data to database');
  // readCharStream.on('data', (row)=>{
  //   process++;
  //     if(process>=PROCESS_LIMIT)
  //   readCharStream.pause();
  //   const char = new Chars({id:row[0],product_id:row[1],name:row[2]});
  //   char.save()
  //   .then((res)=>{
  //       //console.log(res);
  //       process--;
  //       if(process<PROCESS_LIMIT)
  //         readCharStream.resume();
  //     }
  //   );

  // })
  // .on('end', ()=>{
  //   console.log('characteristics stored');
  //   return readCharRevStream.on('data', (row)=>{
  //     process++;
  //     if(process>=PROCESS_LIMIT)
  //       readCharRevStream.pause();
  //     //id,characteristic_id,review_id,value

  //     const charRev = new CharsRevs({id:row[0],characteristic_id:row[1],review_id:row[2],value:row[3]});
  //     charRev.save()
  //     .then((res)=>{
  //         //console.log(res);
  //         process--;
  //         if(process<PROCESS_LIMIT)
  //           readCharRevStream.resume();
  //       }
  //     );

  //   })
  //   .on('end', ()=>{
  //     console.log('two down!');
  //     return readPicturesStream.on('data', (row)=>{
  //       process++;
  //       if(process>=PROCESS_LIMIT)
  //         readPicturesStream.pause();
  //       //id,review_id,url
  //       const Picture = new Pictures({id:row[0],review_id:row[1],url:row[2]});
  //       Picture.save()
  //       .then((res)=>{
  //           //console.log(res);
  //           process--;
  //           if(process<PROCESS_LIMIT)
  //             readPicturesStream.resume();
  //         }
  //       );

  //     })
  //     .on('end', ()=>{
        console.log('now for the tough one...');
        readRevsStream.on('data', async (row)=>{
          process++;
          if(process>=PROCESS_LIMIT)
            readRevsStream.pause();
          //hrm...
          //id,product_id,rating,date,summary,body,recommend,reported,reviewer_name,reviewer_email,response,helpfulness
          const Review = new Reviews({
            id:row[0],
            product_id:row[1],
            rating:row[2],
            date:row[3],
            summary:row[4],
            body:row[5],
            recommend:row[6],
            reported:row[7],
            reviewer_name:row[8],
            reviewer_email:row[9],
            response:row[10],
            helpfullness:row[11]
          });
          Review.save()
          .then((res)=>{
            process--;
            if(process<PROCESS_LIMIT)
              readRevsStream.resume();
            }
          );

        })
        .on('end', ()=>{
          console.log('that should be all');
        })
  //     })

  //   })
  // })




  // const readStream = fs.createReadStream(path.join(__dirname,filepathCharsRevs))
  // .pipe(parse({delimiter: ','}));


  // readStream.on('data', (row)=>{
  //   readStream.pause();

  //   const charRev = new CharsRevs({id:row[0],characteristic_id:row[1],review_id:row[2],value:row[3]});
  //   charRev.save()
  //   .then((res)=>{
  //       console.log(res);
  //       readStream.resume();
  //     }
  //   );

  // })
  // .on('end', ()=>{
  //   console.log('whew');
  //   //console.log(charArr);
  // })



  // var charRevArr =[];
  // //id,characteristic_id,review_id,value
  // fs.createReadStream(path.join(__dirname,filepathCharsRevs))
  // .pipe(parse({delimiter: ','}))
  // .on('data', (row)=>{
  //   charRevArr.push({id:row[0],characteristic_id:row[1],review_id:row[2],value:row[3]});
  //   //console.log(row);
  // })
  // .on('end', ()=>{
  //   console.log('whew');
  // })

  // //id,review_id,url
  // var photoArr = [];
  // fs.createReadStream(path.join(__dirname,filepathPhotos))
  // .pipe(parse({delimiter: ','}))
  // .on('data', (row)=>{
  //   photoArr.push({id:row[0],review_id:row[1],url:row[2]});
  //   //console.log(row);
  // })
  // .on('end', ()=>{
  //   console.log('whew');
  //   console.log(photoArr);
  // })

  //id,product_id,rating,date,summary,body,recommend,reported,reviewer_name,reviewer_email,response,helpfulness
  // var RevsArr = [];
  // fs.createReadStream(path.join(__dirname,filepathRevs))
  // .pipe(parse({delimiter: ','}))
  // .on('data', (row)=>{
  //   RevsArr.push({
  //     id:row[0],
  //     product_id:row[1],
  //     rating:row[2],
  //     date:row[3],
  //     summary:row[4],
  //     body:row[5],
  //     recommend:row[6],
  //     reported:row[7],
  //     reviewer_name:row[8],
  //     reviewer_email:row[9],
  //     response:row[10],
  //     helpfulness:row[11]
  //   });
  //   //console.log(row);
  // })
  // .on('end', ()=>{
  //   console.log('whew');
  //   console.log(RevsArr);
  // })



}
