const express = require('express');
const router = express.Router();

//FIle Imports
const {loginUser , registerUser} = require('../controllers/authController.js');

//Route Middlewares
router.route('/login').post(loginUser);
router.route('/register').post(registerUser);


module.exports = router;