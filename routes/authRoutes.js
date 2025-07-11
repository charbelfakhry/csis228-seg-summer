const router = require('express').Router();
const AuthController = require('../controllers/AuthController');
const {loginValidator} = require('../validators/authValidator');
const validateRequest = require('../middlewares/validateRequest');

const authController = new AuthController();

router.post('/login', loginValidator, validateRequest, authController.login.bind(authController));
router.post('/register', authController.register.bind(authController));

module.exports = router;