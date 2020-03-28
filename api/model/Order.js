const mongoose = require('mongoose');
const orderSchema = mongoose.Schema({
    _id : mongoose.Schema.Types.ObjectId,
    name:  {type: String, required: true},
    price: {type: Number, required: true} // required to make the field mandatory. I user doesn't send it then it will throw error
});
module.exports = mongoose.model('Order', orderSchema);