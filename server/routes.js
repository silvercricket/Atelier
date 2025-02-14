var router = require('express').Router();
const {db, Char, CharRev, Picture, Review} = require('./middleware/schemaSequelize.js');
router.get('/reviews', (req, res)=>{
  var result = [];
  console.log(req.headers.product_id);
  Review.findAll({
    where: {
      product_id: req.headers.product_id
    },
    attributes: ['id','body','summary','helpfullness','createdAt','reviewer_name','response','reccomend','reviewer_email']
  })
  .then((reviews)=>{

    console.log(reviews[0].dataValues);
    for(var i = 0; i <reviews.length;i++){
      var review = reviews[i];
      Picture.findAll({
        where: {
          reviewId:reviews[i].id
        },
        attributes: ['url']
      })
      .then((Pictures)=>{
        review.pictures = Pictures;
        CharRev.findAll({
          where: {
            reviewId: review.id
          }
        })
        .then((charReviews)=>{
          console.log(charReviews);
          review.characteristics = charReviews;
          for(var j = 0; j < review.characteristics.length; j++){
            console.log('wow')
            Char.findAll({
              where: {
                characteristicId: review.characteristics[i].id,
                productId: req.headers.product_id
              }
            })
            .then((characteristic)=>{

              review.characteristics[i].name = characteristic.name;
              if(j = review.characteristics.length - 1){
                result.push(review);
              }
            })
          }
        })
      })

    }

    //console.log(result.length);
  })
  .then(()=>{
    res.json(result);
  })
  //res.json('request received');
});

// router.post('/messages', controller.messages.post);

// router.get('/users', controller.users.get);

// router.post('/users', controller.users.post);

module.exports = router;