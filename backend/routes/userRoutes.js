const router = require('express').Router();

const { login_user, register_user, get_users } = require('../controllers/userControllers');
const { protect, admin } = require('../middlewares/authMiddleware');

router.route('/login').post(login_user);
router.route('/register').post(register_user);
router.route('/get_users').get(admin, get_users)

module.exports = router;