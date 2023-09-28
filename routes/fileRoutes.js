const express = require('express');
const router = express.Router();

//File Imports
const {verifyToken} = require('../verifyToken.js');
const {uploadFile,getAllFiles} =  require('../controllers/fileController.js');
// //File routing
router.route('/uploadFile').post(verifyToken,uploadFile);
router.route('/getAllFiles').post(verifyToken,getAllFiles);


module.exports = router;