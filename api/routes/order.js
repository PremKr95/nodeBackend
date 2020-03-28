const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Order = require('../model/order')
const Product = require('../model/product')
router.get('/', (req, res, next) => {
    Order.find()
    .select('quantity product _id')
    .populate('product', 'name _id') // it will populate the order with product and will select only name and id
    .exec()
    .then(results => {
        res.status(200).json({
            count: results.length,
            orders: results.map(result => {
                return {
                    _id: result._id, 
                    product: result.product,
                    quantity: result.quantity,
                    request : {
                        type: 'GET',
                        url : 'http://localhost:3000/orders/' + result._id
                    }
                }
            }),
        })
    }).catch(error => {
        res.status(500).json({
            error: error
        });
    });
});

router.post('/', (req, res, next) => {
    Product.findById(req.body.productId).exec()
    .then(product => {
        if (!product) {
            return res.status(404).json({
                message: 'Product Not Found'
            });
        }
        const order = new Order({
            _id : mongoose.Types.ObjectId(),
            quantity: req.body.quantity,
            product: req.body.productId
        })
        return order.save()
    })
    .then(result => {
        res.status(201).json({
            message: "Order Created",
            createdOrder : {
                _id: result._id,
                product: result.product,
                quantity: result.quantity
            },
            request : {
                type: 'GET',
                url: 'http://localhost:3000/orders/'+result._id
            }

        });
    })
    .catch(error => {
        res.status(500).json({
            error: error
        });
    });
});

router.get('/:orderId', (req, res, next) => {
    Order.findById(req.params.orderId)
    .exec()
    .then(order => {
        res.status(200).json({
            order: order,
            request: {
                type: 'GET',
                url : 'http://localhost:3000/orders'
            }
        })
    })
    .catch(error =>{
        res.status(500).json({
            error: error
        })
    })
});

router.delete('/:orderId', (req, res, next) => {
        res.status(200).json({
            message: "Order deleted",
            orderId: req.params.orderId
        })
})

module.exports = router;