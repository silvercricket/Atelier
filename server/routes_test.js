const request = require('supertest');
const express = require('express');
var router = require('./routes.js');
var bodyParser = require('body-parser')

let expect = require('chai').expect;
// (async()=>{
//   const expect = await import('chai').expect;
// })
//const { expect } = require('chai');
//const expect = require('chai').expect;

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
console.log('testing');

app.use('/reviews', router);
app.set({'product_id': 1})
describe('/reviews', () => {
  it('should at least return the correct content type', () => {
    request(app)
    .get('/reviews/reviews')
    .expect('Content-Type',"application/json; charset=utf-8")
    .expect('Data-Type',"object")
    .expect(200)
    .end((err,res)=>{
      if(err){
        throw err;
      } else {
        console.log(res);
      }
    })
  })

  it('should return success for posted reviews', () => {
    request(app)
    .post('/reviews/reviews')
    .send({
      body: 'I\'m so tired... os so soooooooo tire my boi',
      summary: 'slep is overrated though',
      reviewer_name: 'soTired',
      reviewer_email: 'sleepy@dude.com',
      pictures: [],
      characteristics: [{name:'quality',value:3}],
      reccomend: true
    })
    .set({product_id: 1})
    .expect('Content-Type',"text/html; charset=utf-8")
    .expect(200)
    .end((err,res)=>{
      if(err){
        throw err;
      } else {
        console.log(res);
      }
    })
  })
  var reviewId;
  it('and then retrieve them from the database, and then report them, and have them no longer appear.', () => {
    request(app)
    .get('/reviews/reviews')
    .set({product_id: 1})
    .expect(200)
    .end((err,res)=>{
      if(err){
        throw err;
      } else {
        console.log('over here________________')
        console.log((res.body[res.body.length - 1].body))
        expect(res.body[res.body.length - 1].body).to.equal('I\'m so tired... os so soooooooo tire my boi')
        var reviewId = res.body[res.body.length - 1].id;
        console.log('this should happen first_______');

        //it('and finally report them and no longer retrieve them', () => {
          console.log('this should happen second_______');

          request(app)
          .post('/reviews/report')
          .set({review_id: reviewId})
          .expect(200)
          .end((err,res)=>{
            if(err){
              throw err;
            } else {
              request(app)
                .get('/reviews/reviews')
                .set({product_id: 1})
                .expect('Content-Type',"application/json; charset=utf-8")
                .expect(200)
                .end((err,res)=>{
                  if(err){
                    throw err;
                  } else {
                    expect(res.body[res.body.length - 1].id).to.not.equal(reviewId)
                    process.exit();
                  }
                })
              }})

            //})
      }
    })
  })


})
