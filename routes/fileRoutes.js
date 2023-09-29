const express = require('express');
const router = express.Router();

//File Imports
const {verifyToken} = require('../verifyToken.js');
const {uploadFile,getAllFiles,deleteAll} =  require('../controllers/fileController.js');
// //File routing
router.route('/uploadFile').post(verifyToken,uploadFile);
router.route('/getAllFiles').get(verifyToken,getAllFiles);
router.route('/deleteAll').post(deleteAll);

module.exports = router;