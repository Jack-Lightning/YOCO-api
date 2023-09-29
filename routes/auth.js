const express = require('express');
const router = express.Router();

//FIle Imports
const {loginUser , registerUser} = require('../controllers/authController.js');
const {userLogin} = require('../models/googleuserModel.js');

//Route Middlewares
router.route('/login').post(loginUser);
router.route('/register').post(registerUser);

router.route('/gauth').post(userLogin);

module.exports = router;