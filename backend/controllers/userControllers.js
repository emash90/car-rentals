const mongoose = require('mongoose');
const User = require('../models/user');
const bcrypt = require('bcryptjs');


//create
exports.register_user = async (req, res) => {
    const { email, password } = req.body;
    if ( !email || !password) return res.status(400).json({ msg: 'Please include all fields' });
    const user_exists = await User.findOne({ email });
    if(user_exists) return res.status(400).json({ msg: 'User already exists' });
    const hashed_password = await bcrypt.hash(password, 10);
    try {
        const newUser = new User({
            email,
            password: hashed_password
        });
        await newUser.save()
            .then(() => res.status(200).json({ user:
                { email: newUser.email, role: newUser.role }
             }))
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
}

exports.login_user = async (req, res) => {
    const { email, password } = req.body;
    if (!(email && password)) return res.status(400).json({ msg: 'Please include all fields' });
    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ msg: 'User does not exist' });
        const password_match = await bcrypt.compare(password, user.password);
        if (!password_match) return res.status(400).json({ msg: 'Invalid credentials' });
        req.session.user = user;
        res.status(200).json({
            user: {
                email: user.email,
                role: user.role
            }
        });
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
}

exports.get_users = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json({ users });
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
}




