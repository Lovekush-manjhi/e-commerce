const mongoose = require('mongoose');

const orderItemsSchema = mongoose.Schema({
    quantity: {
        type: Number,
        required: true
    },
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
    }
});

const OrderItem = mongoose.model('OrderItem', orderItemsSchema);

module.exports = OrderItem;
