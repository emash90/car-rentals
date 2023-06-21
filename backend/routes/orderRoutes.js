const router = require('express').Router();
const { get_orders, add_order } = require('../controllers/orderControllers');

router.route('/').get(get_orders).post(add_order);
//router.route('/:id').get(get_order).put(update_order).delete(delete_order);

module.exports = router;