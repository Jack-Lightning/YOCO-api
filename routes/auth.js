const express = require('express');
const router = express.Router();

//FIle Imports
const {loginUser , registerUser} = require('../controllers/authController.js');
const {uploadFile,getAllFiles}  =require('../controllers/fileController.js');
const {verifyToken} = require('../verifyToken.js');

//Route Middlewares
router.route('/login').post(loginUser);
router.route('/register').post(registerUser);

router.route('/uploadFile').post(uploadFile);
router.route('/getAllFiles').post(getAllFiles);
module.exports = router;