const express = require('express');
const routes = express.Router();
const Product = require('../model/product')
const mongoose = require('mongoose');

// Modified Post request using mongoose.
routes.post('/', (req, res, next) => {
    const product = new Product({
        _id : mongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price
    });
    product.save().then(result => {
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

    Product.find()
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
    Product.findById(req.params.productId).exec().then(doc => {
        res.status(200).json({
           message: "Data for Given Product ID",
           product: doc 
        });
    }).catch(error => {
        res.status(500).json({
            error:  error
        })
    });
})

// Modified DELETE request with Product ID.
routes.delete('/:productId', (req, res, next) => {
    const id = req.params.productId
    Product.remove({_id: id}).then(result => {
        console.log("result", result)
        res.status(200).json(result)
    }).catch(error => {
        console.log("error", error)
        res.status(500).json({error: error})
    })
})

// Normal Delete Request
// routes.delete('/:productId', (req, res, next) => {
//     res.status(200).json({
//         message: "Product Delete Request",
//         id: req.params.id
//     });
// });


// Update(Patch) modified request
routes.patch('/:productId', (req, res, next) => {
    const id = req.params.productId
    const updateOps = {};
    console.log("req.body", req.body);
    for (const ops of req.body) {
        updateOps[ops.propName] = ops.value
    }
    console.log("updateOps", updateOps)
    Product.update({_id: id}, { $set: updateOps}).exec().then(result => {
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