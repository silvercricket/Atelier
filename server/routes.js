var router = require('express').Router();
const {db, Char, CharRev, Picture, Review} = require('./middleware/schemaSequelize.js');

Review.hasMany(Picture,{
  sourceKey: 'id',
  foreignKey: 'reviewId'
});
Picture.belongsTo(Review,{
  through:'reviewId',
  targetKey: 'id'
});

Review.hasMany(CharRev,{
  foreignKey: 'reviewId',
  sourceKey: 'id'
});

Char.hasOne(CharRev,{
  foreignKey: 'characteristicId',
  sourceKey: 'id'
});
CharRev.belongsTo(Char, {
  sourceKey: 'characteristicId',
  targetKey: 'id'
});

Review.hasMany(CharRev,{
  sourceKey: 'id',
  foreignKey: 'reviewId'
});
CharRev.belongsTo(Review, {
  sourceKey: 'reviewId',
  targetKey: 'id'
})

Review.sync();
Char.sync();
CharRev.sync();
Picture.sync();



router.get('/reviews', (req, res)=>{




  var result = [];
  var pics = [];
  var charsProcessed = false;
  var picsProcessed = false;
  var charRevsQuota = 0;
  var quota = 0;
  var charQuota;
  console.log('____________________');
  ////console.log(req.headers.product_id);
    Review.findAll({
    where: {
      productId: req.headers.product_id
      //reported: false
    },
    include: [
      {model: Picture, required: false},
      {model: CharRev, include: [{model:Char}]},


    ]



  })
  .then((data)=>{
    const reviews = JSON.parse(JSON.stringify(data));

    res.json(reviews);
  })

});

router.get('/metaData', (req, res)=>{




  var result = [];
  var pics = [];
  var charsProcessed = false;
  var picsProcessed = false;
  var charRevsQuota = 0;
  var quota = 0;
  var charQuota;
  console.log('____________________');
  ////console.log(req.headers.product_id);
    Review.findAll({
    where: {
      productId: req.headers.product_id
      //reported: false
    },
    include: [
      {model: CharRev, include: [{model:Char}]},


    ]



  })
  .then((data)=>{
    const reviews = JSON.parse(JSON.stringify(data));
    var metaData = {};

    for(var i = 0; i < reviews.length; i++){
      for(var j = 0; j < reviews[i].characteristics_reviews.length; j++){
        if(metaData[reviews[i].characteristics_reviews[j].characteristic.name] === undefined){

          metaData[reviews[i].characteristics_reviews[j].characteristic.name] ={
            value: reviews[i].characteristics_reviews[j].value,
            votes: 1
          };
        } else {
          console.log('i:');
          console.log(i);
          console.log('j:');
          console.log(j);
          metaData[reviews[i].characteristics_reviews[j].characteristic.name].value += reviews[i].characteristics_reviews[j].value;
          metaData[reviews[i].characteristics_reviews[j].characteristic.name].votes ++;
        }
      }
    }

    for(var i in metaData){
      metaData[i].value /= metaData[i].votes;
    }
    res.json(metaData);
  })

});






router.post('/reviews', (req, res)=>{
  console.log(req.body);
  const product_id = JSON.parse(req.headers.product_id);
  const review = req.body;
  const body = review.body;
  const summary = review.summary;
  const reccomend = JSON.parse(review.reccomend);
  const reviewer_name = review.reviewer_name;
  const reviewer_email = review.reviewer_email;
  console.log(typeof review.pictures);
  const pics = JSON.parse(review.pictures);
  const characteristics = JSON.parse(review.characteristics);
  response = false;
  console.log(characteristics);
  Review.create({
    productId: product_id,
    body : body,
    summary : summary,
    reccomend : reccomend,
    reviewer_name: reviewer_name,
    reviewer_email: reviewer_email,
    helpfullness: 0
  })
  .then((data)=>{
    //console.log(review_data.toJSON());
    //{db, Char, CharRev, Picture, Review}
    console.log('halp');
    const review_data = JSON.parse(JSON.stringify(data));
    for(var i = 0; i < pics.length; i++){
      Picture.create({
        reviewId: review_data.id,
        url: pics[i]
      })
    }
    for(var i = 0; i < characteristics.length; i++){
      Char.create({
        productId:product_id,
        name:characteristics[i].name
      })
      .then((data)=>{
        char_data = JSON.parse(JSON.stringify(data));
        for(var j=0; j < characteristics.length; j++){
          if(characteristics[j].name = char_data.name){
            CharRev.create({
              characteristicId: data.id,
              reviewId: review_data.id,
              value: characteristics[j].value
            })
            .then(()=>{
              if(!response){
                response = true;
                res.json('data posted');
              }
            })
            .catch((err)=>{
              res.json(err);
            })
          }
        }
      })
    }
  })
});


router.post('/report', (req, res)=>{
  console.log('reporting time~')
  const review_id = JSON.parse(req.headers.review_id);
  if(review_id === undefined){
    res.json('review undefined');
  }

  Review.update({
    reported: true
  },
  {
    where: {
      id:review_id
    }
  }
)
.then(res.json('reported'))

});


router.post('/helpfullness', (req, res)=>{

  const review_id = JSON.parse(req.headers.review_id);
  if(review_id === undefined){
    res.json('review undefined');
  }

  Review.findOne({
    where: {
      id: review_id
    },
  })
  .then((data)=>{
    var helpfullness = JSON.parse(JSON.stringify(data)).helpfullness;
    helpfullness++;
    Review.update({
      helpfullness: helpfullness
    },
    {
      where: {
        id:review_id
      }
    }
  )
  .then(res.json('helpful'))
  })

});

router.post('/response', (req, res)=>{

  const review_id = JSON.parse(req.headers.review_id);
  if(review_id === undefined){
    res.json('review undefined');
  }

  const response = req.body.response;

  Review.update({
    response: response
  },
  {
    where: {
      id:review_id
    }
  }
)
.then(res.json('you tell em'))

});



// router.post('/messages', controller.messages.post);

// router.get('/users', controller.users.get);

// router.post('/users', controller.users.post);

module.exports = router;


















/*
router.get('/reviews', (req, res)=>{
  var result = [];
  var pics = [];
  var charsProcessed = false;
  var picsProcessed = false;
  var charRevsQuota = 0;
  var quota = 0;
  var charQuota;
  ////console.log(req.headers.product_id);
  Review.findAll({
    where: {
      product_id: req.headers.product_id
    },
    attributes: ['id','body','summary','helpfullness','createdAt','reviewer_name','response','reccomend','reviewer_email']
  })
  .then((reviews)=>{

    for(var i = 0; i <reviews.length;i++){

      var review = reviews[i].dataValues;
      result.push(review);

    }

    for(var i = 0; i<result.length; i++){

      Picture.findAll({
        where: {
          review_id:result[i].id
        },
        attributes: ['url','review_id']
      })
      .then((Pictures)=>{

        pics = [];
        for(var k = 0; k < Pictures.length; k++){
          pics.push(Pictures[k].dataValues.url);
        }

        if(Pictures.length){
          for(var k = 0; k < result.length; k++ ){
            if(result[k].id === Pictures[0].dataValues.review_id){
              result[k].pictures = pics.slice();
            }
          }
        }

      });

      console.log(result[i].id);
      CharRev.findAll({//id,characteristic_id,review_id,value
        where: {
          review_id: result[i].id
        }
      })
      .then((charReviews)=>{
        charRevsQuota++;
        console.log('characteristics:')
        console.log(charReviews);

        var charRevs = [];

        quota+=charReviews.length;
        charReviews.forEach((e)=>{
          charRevs.push(e.dataValues);
        })

        for(var k = 0; k < charReviews.length; k++){

          console.log(1);
          for(var kk = 0; kk < result.length; kk++ ){
            if(result[kk].id === charReviews[0].dataValues.review_id){
              result[kk].characteristics = charRevs.slice();
              console.log(2);
            }
          }
          console.log('something fucking is going')
          console.log(charRevs);
          if(charRevsQuota === result.length){
            result.forEach((review)=>{
              review.characteristics.forEach((char)=>{
                Char.findAll({//id,product_id,name
                  where: {
                    id: char.characteristic_id,
                    product_id: req.headers.product_id
                  }
                })
                .then((characteristic)=>{

                  for(var j = 0; j < result.length; j++){

                    for(var jj = 0; jj < result[j].characteristics.length; jj++){

                      if(result[j].characteristics[jj].characteristic_id === characteristic[0].dataValues.id){

                        result[j].characteristics[jj].name = characteristic[0].dataValues.name;

                        quota--;
                        console.log('quota');
                        console.log(quota);
                        if(!quota){
                          res.json(result);
                        }
                      }
                    }
                  }

                })
              })


            })
        }
        }
      })
    }
})
});


*/