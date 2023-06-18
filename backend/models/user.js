const mongoose = require('mongoose');


//user schema

const userSchema = new mongoose.Schema({
    email: { type: String, unique: true },
    password: { type: String },
    role: { type: Number, default: 0 } //0 = user, 1 = car lender, 2 = admin
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

module.exports = User;