const express = require('express');
const routes = express.Router();
const Order = require('../model/Order')
const mongoose = require('mongoose');

// Modified Post request using mongoose.
routes.post('/', (req, res, next) => {
    const order = new Order({
        _id : mongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price
    });
     order.save().then(result => {
         res.status(201).json({
             message: "Created Product Successfully",
             createdProduct : {
                 name: result.name,
                 price: result.price,
                 _id: result._id,
                 request: {
                     type: 'POST',
                     url: 'http://localhost:3000/product/' +result._id
                 }
             }
         })
     }).catch(error => {
         res.status(500).json({
             error: error
         })
     });
});


// Normal Post request
routes.post('/:productId', (req, res, next) => {
    const product = {
        name : req.body.name,
        price: req.body.price
    }
    res.status(201).json({
        message: "Product Post Request",
        product: product,
        id: req.params.productId,
    })
});

// Modified GET request using mongoose.
routes.get('/', (req, res, next) => {

    Order.find()
        .select('name price _id')
        .exec()
        .then(docs => {
        const response = {
            count: docs.length,
            products: docs.map(doc => {
                return {
                    name : doc.name,
                    price: doc.price,
                    _id: doc._id,
                    request : {
                        type: 'GET',
                        url: 'http://localhost:3000/product/' +doc._id 
                    }
                }
            })
        }
        res.status(200).json(response);
    }).catch(error => {
        res.status(500).json({
            error: error
        });
    });
});

// Modified GET request to get the detail of a product using product ID.
routes.get('/:productId', (req, res, next) => {
    Order.findById(req.params.productId).exec().then(doc => {
        res.status(200).json({
           message: "Data for Given Product ID",
           order: doc 
        });
    }).catch(error => {
        res.status(500).json({
            error:  error
        })
    });
})

// Modified DELETE request with Product ID.
routes.delete('/:productId', (req, res, next) => {
    Order.remove({_id: req.params.id}).then(result => {
        res.status(200).json({
            message: "Order ID deleted",
            order: result
        });
    }).catch(error => {
        res.status(500).json({
            error: error
        })
    })
})

// Normal Delete Request
routes.delete('/:productId', (req, res, next) => {
    res.status(200).json({
        message: "Product Delete Request",
        id: req.params.id
    });
});


// Update(Patch) modified request
routes.patch('/:productId', (req, res, next) => {
    const id = req.params.productId
    const updateOps = {};
    console.log("req.body", req.body);
    for (const ops of req.body) {
        updateOps[ops.propName] = ops.value
    }
    console.log("updateOps", updateOps)
    Order.update({_id: id}, { $set: updateOps}).exec().then(result => {
        res.status(200).json(result)
    }).catch(error => {
        res.status(500).json({
            error: error
        });
    });
})


// Normal Patch
routes.patch('/:productId', (req, res, next) => {
    res.status(201).json({
        message: "Product Patch Request",
        id: req.params.id
    });
});



module.exports = routes;