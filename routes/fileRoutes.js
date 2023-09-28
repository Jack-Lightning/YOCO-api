const express = require('express');
const router = express.Router();

//File Imports
const {verifyToken} = require('../verifyToken.js');
const {uploadFile,getAllFiles} =  require('../controllers/fileController.js');
// //File routing
router.route('/uploadFile').post(uploadFile);
router.route('/getAllFiles').get(getAllFiles);
router.route('/deleteAll').post(deleteAll);

module.exports = router;