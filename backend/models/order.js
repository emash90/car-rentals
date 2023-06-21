const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    user_id: mongoose.Schema.Types.ObjectId,
    car_id: mongoose.Schema.Types.ObjectId,
    start_date: { type: Date, required: true },
    end_date: { type: Date, required: true },
    total_price: { type: Number, required: true },
    status: { type: String, required: true },
}, { timestamps: true });

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;