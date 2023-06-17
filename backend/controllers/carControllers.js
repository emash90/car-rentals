const mongoose = require('mongoose');
const Car = require('../models/car');


//create
exports.add_car = async (req, res) => {
    console.log("req.body", req.body)
    if (!req.body.make || !req.body.model || !req.body.year || !req.body.color || !req.body.price /*|| !req.body.last_service_date || !req.body.images */) {
        return res.status(400).json({ msg: 'Please include all fields' });
    }
    try {
        const newCar = new Car({
            make: req.body.make,
            model: req.body.model,
            year: req.body.year,
            color: req.body.color,
            price: req.body.price,
            last_service_date: req.body.last_service_date,
            images: req.body.images
        });
        console.log("newCar", newCar);
        await newCar.save()
            .then(() => res.status(200).json({ msg: 'Car added' }))
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

//read
exports.get_cars = async (req, res) => {
    try {
        const cars = await Car.find();
        res.status(200).json(cars);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

//get one car
exports.get_car = async (req, res) => {
    const id = req.params.id;
    try {
        const car = await Car.findById(id);
        res.status(200).json(car);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
}

//update

exports.update_car = async (req, res) => {
    const id = req.params.id;
    try {
        const car = await Car.findByIdAndUpdate(id, req.body);
        res.status(200).json({ msg: 'Car updated' });

    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

//delete
exports.delete_car = async (req, res) => {
    const id = req.params.id;
    try {
        const car = await Car.findByIdAndDelete(id);
        res.status(200).json({ msg: 'Car deleted' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}
