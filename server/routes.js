var router = require('express').Router();
const {db, Char, CharRev, Picture, Review} = require('./middleware/schemaSequelize.js');

Review.hasMany(Picture,{
  sourceKey: 'id',
  foreignKey: 'reviewId'
});
Review.Picture = Picture.belongsTo(Review,{
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
Char.Rev = CharRev.belongsTo(Char, {
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



router.get('/', (req,res)=>{
  console.log('ahahahahahah');
  res.send('health');
});
router.get('/reviews', (req, res)=>{

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
    res.json(data);
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

  const product_id = JSON.parse(req.headers.product_id);
  const review = req.body;
  const body = review.body;
  const summary = review.summary;
  const reccomend = JSON.parse(review.reccomend);
  const reviewer_name = review.reviewer_name;
  const reviewer_email = review.reviewer_email;
  var pics;


  if(review.pictures.length){
    pics = JSON.parse(review.pictures);
  }else{
    pics = [];
  }

  const characteristics = JSON.parse(review.characteristics);

  const totalChar = characteristics.length;
  var finishedChar = 0;
  response = false;

  Review.create({
    productId: product_id,
    body : body,
    summary : summary,
    reccomend : reccomend,
    reviewer_name: reviewer_name,
    reviewer_email: reviewer_email,
    helpfullness: 0,
    Picture: pics
  },
  {
    include: [
      {
        association: Review.Picture
      }
    ]
  }
  )
  .then((data)=>{
    res.json('data posted');
    //console.log(review_data.toJSON());
    //{db, Char, CharRev, Picture, Review}
    const review_data = JSON.parse(JSON.stringify(data));

   for(var i = 0; i < characteristics.length; i++){

      Char.create({
        productId:product_id,
        name:characteristics[i].name,
        //characteristics_reviews
        CharRev: [{//characteristic_id,review_id
          reviewId:review_data.id,
          value: characteristics[i].value

        }]
      },{
        include: [{
          association: Char.Rev
        }
        ]
      })
      .then((data)=>{
        if(finishedChar===totalChar){
          response = true;

          res.json('data posted');
        } else {
          finishedChar++;

        }
      })
      .catch((err)=>{
        console.log(err);
        res.json(err);
      })
    }
  })
});


router.post('/report', (req, res)=>{
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


module.exports = router;


