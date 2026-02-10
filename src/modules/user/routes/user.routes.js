const router = require('express').Router();
const userController = require('../interface/user.controller');

router.post('/', userController.handleCreateUser);
router.get('/:id', userController.handleGetUser);

module.exports = router;
