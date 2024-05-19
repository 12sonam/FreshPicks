const express  = require('express');
const router = express.Router();
const checkout = require("../getControllers/checkout.js");

router.get('/getcheckout',checkout);
module.exports = router;