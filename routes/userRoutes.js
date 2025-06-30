const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');

const userController = new UserController();

router.get('/', userController.getAll.bind(userController));
router.get('/:id', userController.getById.bind(userController));
router.post('/', userController.add.bind(userController));


module.exports = router;