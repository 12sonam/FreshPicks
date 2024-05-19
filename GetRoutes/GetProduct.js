const express = require('express');
const router = express.Router();
const productController = require('../getControllers/getProduct');

router.get('/getproducts', productController); 

module.exports = router;

