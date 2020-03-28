const express = require('express');
const app = express();
const productRoutes = require('./api/routes/product')
const bodyParser = require('body-parser'); // body Parser to get the data from request body
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

const mongoose = require('mongoose');
mongoose.connect("mongodb+srv://premmongodb:mongodb@95@node-rest-shop-nhhf7.mongodb.net/test?retryWrites=true&w=majority", 
{
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
  })
  .then(() => {
     console.log('connected to database');
  })
  .catch(error => {
     //MongooseServerSelectionError MongooseError [MongooseServerSelectionError]: Authentication failed
     console.log("Error", error)
  });
app.use('/product', productRoutes);

module.exports = app;