const mongoose = require('mongoose');

const carSchema = new mongoose.Schema({
    make: { type: String, required: true },
    model: { type: String, required: true },
    year: { type: Number, required: true },
    color: { type: String, required: true },
    price: { type: Number, required: true },
    last_service_date: { type: Date, required: false },
    images: { type: Array, required: false },
}, { timestamps: true });

const Car = mongoose.model('Car', carSchema);

module.exports = Car;