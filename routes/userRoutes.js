const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');
const { getUserByIdValidator, createUserValidator, updateUserValidator, deleteUserValidator } = require('../validators/userValidator');
const validateRequest = require('../middlewares/validateRequest');
const { restrictTo, protect } = require('../middlewares/authMiddleware');

const userController = new UserController();

router.get('/', protect, restrictTo('admin'), userController.getAll.bind(userController));
router.get('/:id', protect, getUserByIdValidator, validateRequest, userController.getById.bind(userController));
// create a new user
router.post('/', createUserValidator, validateRequest, userController.add.bind(userController));
//update an existing user
router.put('/:id', updateUserValidator, validateRequest, userController.update.bind(userController));
router.delete('/:id', deleteUserValidator, validateRequest, userController.delete.bind(userController));


module.exports = router;