const router = require('express').Router();

const { login_user, register_user } = require('../controllers/userControllers');

router.route('/login').post(login_user);
router.route('/register').post(register_user);

module.exports = router;