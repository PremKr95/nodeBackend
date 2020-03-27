const express = require('express');
const routes = express.Router();

routes.get('/', (req, res, next) => {
    res.status(200).json({
        message: "Product GET Request"
    });
});

routes.post('/:productId', (req, res, next) => {
    res.status(201).json({
        message: "Product Post Request",
        id: req.params.id
    })
});

routes.patch('/:productId', (req, res, next) => {
    res.status(201).json({
        message: "Product Patch Request",
        id: req.params.id
    });
});

routes.delete('/:productId', (req, res, next) => {
    res.status(200).json({
        message: "Product Delete Request",
        id: req.params.id
    });
});

module.exports = routes;