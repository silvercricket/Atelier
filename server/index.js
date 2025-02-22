require('dotenv').config();
const express = require('express');
const path = require('path');
//const auth = require('./middleware/authorization.js');
var bodyParser = require('body-parser')
const axios = require('axios')

const cluster = require('node:cluster');
const os = require('os');

if(cluster.isMaster){
  console.log(`Master process: ${process.pid} is running`);
  console.log('cores: ')
  var cores=os.cpus().length;
  if(cores>8){
    cores = 8;
  }
  //const cores = Math.floor(os.cpus().length*.4);
  for(var i = 0; i < 8; i++){
    cluster.fork();
  }
} else {
  console.log(`Worker process: ${process.pid} started`);
  const app = express();

  var router = require('./routes.js');

  app.use(bodyParser.urlencoded({
    extended: true
  }));

  //app.use(express.static(path.join(__dirname, '../client/dist')));
  app.use(express.json());

  // attach auth key to all routes
  //app.use('/api', auth);
  app.use('/reviews', router);





  app.listen(3000, () => {
    console.log('currently listening on port 3000');
  })
}

