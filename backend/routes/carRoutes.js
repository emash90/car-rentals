const router = require('express').Router();
const { get_cars, add_car, get_car, update_car, delete_car } = require("../controllers/carControllers");

router.route('/').get(get_cars).post(add_car);
router.route('/:id').get(get_car).put(update_car).delete(delete_car);


module.exports = router;