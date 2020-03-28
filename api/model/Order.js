const mongoose = require('mongoose');
const orderSchema = mongoose.Schema({
    _id : mongoose.Schema.Types.ObjectId,
    product : { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true}, // To connect schema with Product 
    quantity: { type: Number, default: 1} // If quanitity is not passed then default 1 is taken. 
});
module.exports = mongoose.model('Order', orderSchema);