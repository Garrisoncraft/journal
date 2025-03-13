const express = require('express');
const UserController = require('../controllers/UserController');
const { validateSignup } = require('../middleware/authUtils');

const router = express.Router();
router.post('/signup', validateSignup, UserController.signup);

router.post('/signin', UserController.signin);


module.exports = router;
