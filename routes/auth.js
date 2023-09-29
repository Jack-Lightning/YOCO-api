const express = require('express');
const router = express.Router();

//FIle Imports
const {loginUser , registerUser, googleLoginUser} = require('../controllers/authController.js');


//Route Middlewares
router.route('/login').post(loginUser);
router.route('/register').post(registerUser);

router.route('/gauth').post(googleLoginUser);

module.exports = router;