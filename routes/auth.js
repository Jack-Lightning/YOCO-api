const express = require('express');
const router = express.Router();

//FIle Imports
const {loginUser , registerUser} = require('../controllers/authController.js');
const {upload}  =require('../controllers/fileController.js')

//Route Middlewares
router.route('/login').post(loginUser);
router.route('/register').post(registerUser);

router.route('/upload').post(upload);

module.exports = router;