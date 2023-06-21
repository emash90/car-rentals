const order = require('../models/order');

exports.get_orders = async (req, res) => {
    try {
        const orders = await order.find();
        res.status(200).json(orders);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

exports.add_order = async (req, res) => {
    if (!req.body.car_id || !req.body.user_id || !req.body.order_date || !req.body.order_status) {
        return res.status(400).json({ msg: 'Please include all fields' });
    }
    try {
        const newOrder = new order({
            car_id: req.body.car_id,
            user_id: req.body.user_id,
            order_date: req.body.order_date,
            order_status: req.body.order_status
        });
        await newOrder.save()
            .then(() => res.status(200).json({ msg: 'Order added' }))
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}
