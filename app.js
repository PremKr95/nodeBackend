const express = require('express');
const app = express();
const productRoutes = require('./api/routes/product')
const bodyParser = require('body-parser'); // body Parser to get the data from request body
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use('/product', productRoutes);

module.exports = app;