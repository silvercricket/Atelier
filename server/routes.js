var router = require('express').Router();
const {db, Char, CharRev, Picture, Review} = require('./middleware/schemaSequelize.js');
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
    ////console.log(reviews);
    //quota = reviews.length;
    for(var i = 0; i <reviews.length;i++){

      var review = reviews[i].dataValues;
      result.push(review);
      //console.log(review);
      ////console.log(review);
    }

    for(var i = 0; i<result.length; i++){

      Picture.findAll({
        where: {
          review_id:result[i].id
        },
        attributes: ['url','review_id']
      })
      .then((Pictures)=>{
        ////console.log(Pictures);

        pics = [];
        for(var k = 0; k < Pictures.length; k++){
          pics.push(Pictures[k].dataValues.url);
        }
        // //console.log('over here!____________')
        // //console.log(Pictures);
        if(Pictures.length){
          for(var k = 0; k < result.length; k++ ){
            if(result[k].id === Pictures[0].dataValues.review_id){
              result[k].pictures = pics.slice();
            }
          }
        }
        // //console.log(review);
      });
      //console.log('i: ')
      //console.log(i);
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
        //console.log(i);
        // console.log(charReviews);
        quota+=charReviews.length;
        charReviews.forEach((e)=>{
          charRevs.push(e.dataValues);
        })
        //console.log(charRevs);
        for(var k = 0; k < charReviews.length; k++){

          //console.log('characteristics: ')
          //console.log(result[k].characteristics)
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
                  //console.log(result);
                  //console.log(characteristic);
                  for(var j = 0; j < result.length; j++){
                    //console.log(characteristic[0])
                    // if(characteristic[0].dataValues)
                    for(var jj = 0; jj < result[j].characteristics.length; jj++){
                      //console.log('__________________')
                      //console.log(characteristic[0].dataValues);
                      //console.log(result[j].characteristics);
                      if(result[j].characteristics[jj].characteristic_id === characteristic[0].dataValues.id){

                        result[j].characteristics[jj].name = characteristic[0].dataValues.name;
                        //console.log('one at a time...');
                        quota--;
                        console.log('quota');
                        console.log(quota);
                        if(!quota){
                          res.json(result);
                        }
                      }
                    }
                  }
                  //console.log('ohai')
                  //console.log(quota);


                })
              })


            })
        }
        }

        //review.characteristics = charReviews;
        ////console.log(result);



      })
    }
})

  //res.json('request received');
});

// router.post('/messages', controller.messages.post);

// router.get('/users', controller.users.get);

// router.post('/users', controller.users.post);

module.exports = router;