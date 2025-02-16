require('dotenv').config();
const express = require('express');
const path = require('path');
const axios = require('axios');
var mysql = require('mysql2');
var Sequelize = require('sequelize');
const fs = require('fs');
const {parse} = require('csv-parse');
const {db, Char, CharRev, Picture, Review} = require('./schemaSequelize.js');
//const filepath = require('./oldData');
const filepathChars = '/oldData/characteristics.csv';
const filepathCharsRevs = '/oldData/characteristic_reviews.csv';
const filepathPhotos = './oldData/reviews_photos.csv';
const filepathRevs = './oldData/reviews.csv';


  //associate = (Review, CharRev,Picture)=>{

  //   Review.hasMany(CharRev, {
  //     as: 'characteristic_review',
  //     foreignKey: 'reviewId'
  //   });
  //   CharRev.belongsTo(Review,{
  //     foreignKey: 'reviewId'
  //   });
  //   Review.hasMany(Picture, {
  //     as: 'pictures',
  //     foreignKey: 'reviewId'
  //   });
  //   Picture.belongsTo(Review,{
  //     foreignKey: 'reviewId'
  //   });
  // }

  // associate = (Char,CharRev) =>{
  //   Char.hasOne(CharRev, {
  //     as: 'characteristic_review',
  //     foreignKey: 'characteristicId'
  //   });
  //   CharRev.belongsTo(Char,{
  //     foreignKey: 'characteristicId'
  //   });
  // }


  //Review.hasMany(Char);
  //Char.belongsTo(Review);


  // Review.associate= (models) =>{
  //   Review.hasMany(models.Picture,{
  //     sourceKey: 'id',
  //     foreignKey: 'reviewId'
  //   });

  //   Review.hasMany(models.CharRev,{
  //     sourceKey: 'id',
  //     foreignKey: 'reviewId'
  //   });

  // }

  // Picture.associate= (models) =>{
  //   Picture.belongsTo(models.Review,{
  //     foreignKey:'reviewId',
  //     sourceKey: 'id'
  //   });
  // }

  // Review.hasMany(Picture,{
  //   foreignKey: 'reviewId'
  // });

  Review.hasMany(CharRev,{
    foreignKey: 'reviewId',
    sourceKey: 'id'
  });
  // Picture.belongsTo(Review,{
  //   foreignKey:'reviewId'
  // });

  // CharRev.belongsTo(Review, {
  //   foreignKey: 'reviewId',
  //   sourceKey: 'id'

  // });
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
  Review.hasMany(Picture,{
    sourceKey: 'id',
    foreignKey: 'reviewId'
  });

  // Picture.belongsTo(Review,{
  //   through:'reviewId',
  //   targetKey: 'id'
  // });
  Review.sync();
  Char.sync();
  CharRev.sync();

  Picture.sync();



  console.log('hello');
  // const CharsRevs = mongoose.model('CharsRevs', CharsRevsSchema);
  // const Chars = mongoose.model('Chars',CharsSchema);
  // const Pictures = mongoose.model('Pictures',PicturesSchema);
  // const Reviews = mongoose.model('Reviews',ReviewSchema);
//}


// module.exports = function(sequelize, DataTypes) {
//   var user =  sequelize.define('user', {
//       id: {
//           type: DataTypes.INTEGER(11),
//           allowNull: false,
//           primaryKey: true,
//           autoIncrement: true,
//           field: 'ID'
//       },
//       password: {
//           type: DataTypes.STRING(255),
//           allowNull: false,
//           field: 'password'
//       },
//       email: {
//           type: DataTypes.STRING(255),
//           allowNull: false,
//           unique: true,
//           field: 'email'
//       },
//       roleId: {
//           type: DataTypes.INTEGER(11),
//           allowNull: false,
//           references: {
//               model: 'role',
//               key: 'ID'
//           },
//           field: 'role_id'
//       }
//   }, {
//       timestamps: false,
//       tableName: 'user'
//   });
//       user.associate = function(models) {
//           user.hasOne(models.role, {foreignKey: 'id',sourceKey: 'roleId'});

//       }
//       return user;
//   };