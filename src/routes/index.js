const express = require('express');
const router = express.Router();
const uploadControll = require('../controllers/inputsLogic')


// create a router 
router.post('/upload', uploadControll.uploadImage);

module.exports = router;